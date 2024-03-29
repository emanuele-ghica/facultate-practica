const express = require("express");
const router = express.Router();
const cron = require('node-cron');
const Exam = require('../models/exam');
const User = require('../models/user');
const Subject = require('../models/subjects');
const { Op } = require('sequelize');


router.use(express.json());

// returns professor and their subjects
router.get('/users/professors', async (req, res) => {
    try {
        const professors = await User.findAll({
            where: {
                user_role: ['professor', 'coordinator']
            },
            attributes: ['id', 'first_name', 'last_name'],
            include: {
                model: Subject,
                attributes: ['subject_id', 'subject_name'],
                as: 'subjects'

            }
        });

        const professorData = professors.map(user => ({
            id: user.id,
            full_name: `${user.last_name} ${user.first_name}`,
            subjects: user.subjects,
        }));
        res.json(professorData);
    } catch (error) {
        console.log('Error fetching professors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// create exam
router.post('', async (req, res, next) => {
    const {professorName,professorId, subject, curriculum, studentYear, LocalDateTime, studentId} =  req.body;
    try {
        console.log("Received Request Body:", req.body);

        const existingExam = await Exam.findOne({
            where: {
                professor_name: professorName,
                subject: subject,
                curriculum: curriculum,
                student_year: studentYear,
            }
        });

        console.log("Existing Exam:", existingExam);

        if (existingExam) {
            console.log("An exam with these details already exists");
            return res.status(409).json({ message: 'An exam with these details already exists' });
        }

        const now = new Date();
        const proposedDateTime = new Date(LocalDateTime);

        if(proposedDateTime < now) {
            return res.status(400).json({ message: 'The proposed date and time cannot be in the past' });
        }

        const newExam = await Exam.create({
             professor_name: professorName,
             professor_id: professorId,
             subject: subject,
             curriculum: curriculum,
             student_year: studentYear,
             status: 'PROPOSED',
             proposed_date: LocalDateTime,
             room: '',
             created_by: studentId,
         });
        console.log(newExam);
        res.status(201).json(newExam);
    } catch (error) {
        console.log('Error fetching the exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//return the exams created by a specific user
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const exams = await Exam.findAll({
            where: {
                created_by: userId,
            }
        });
        const mappedExams = exams.map(exam => {
            return {
                id: exam.id,
                professorName: exam.professor_name,
                subject: exam.subject,
                curriculum: exam.curriculum,
                studentYear: exam.student_year,
                status: exam.status,
                room: exam.room,
                proposedDate: exam.proposed_date,
            }
        })

        res.json(mappedExams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//delete exam
router.delete('/delete/:examId', async (req, res) => {
    const examId = req.params.examId;
    try {
        const deleteExam = await Exam.destroy({
            where: {
                id: examId
            }
        });
        if(deleteExam === 1) {
            res.status(200).json({
                message: 'Exam deleted successfully'
            })
        } else {
                res.status(404).json({
                    error: 'Exam not found'
                })
            };
        } catch(error) {
            console.error('Error deleting exam:', error);
            res.status(500).json({
                error: 'An error occurred while deleting exam'
            })
        }
});

//exams with status review or proposed
router.get('/professor/:professorId', async (req, res) => {
    const professorId = req.params.professorId;
    try {
        const exams = await Exam.findAll({
            where: {
                professor_id: professorId,
                status: {
                    [Op.or]: ['REVIEW', 'PROPOSED']
                }
            }
        });
        const mappedProfessorExams = exams.map(exam => {
            return {
                id: exam.id,
                subject: exam.subject,
                curriculum: exam.curriculum,
                studentYear: exam.student_year,
                status: exam.status,
                proposedDate: exam.proposed_date,
            }
        })
    res.json(mappedProfessorExams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//professor's accepted exams
router.get('/professorAccepted/:professorId', async (req, res) => {
    const professorId = req.params.professorId;
    try {
        const exams = await Exam.findAll({
            where: {
                professor_id: professorId,
                status: 'ACCEPTED'
            }
        });
        const mappedProfessorAcceptedExams = exams.map(exam => {
            return {
                id: exam.id,
                subject: exam.subject,
                curriculum: exam.curriculum,
                studentYear: exam.student_year,
                status: exam.status,
                room: exam.room,
                proposedDate: exam.proposed_date,
            }
        })
        res.json(mappedProfessorAcceptedExams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// accepted by professor, status changes from proposed to review
router.put('/:id/review', async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Exam.findOne(
            {
                where:
                    {id: examId}
            }
        )
        if(!exam) {
            return res.status(404).json({error: 'Exam not found'})
        }

        exam.status = 'REVIEW';
        exam.edited_at = new Date();
        await exam.save();
        return res.status(200).json({ message: 'Exam status updated successfully', exam });

    } catch(error) {
        console.error('Error updating exam status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

// secretary accepts an exam
router.put('/:id/accept', async (req, res) => {
    try {
        const examId = req.params.id;
        const proposedDate = req.body.proposedDate
        const room = req.body.room;

        const sameRoomExam = await Exam.findOne({
            where: {
                proposed_date: proposedDate,
                room: room
            }
        });


        if (sameRoomExam) {
            return res.status(409).json({ error: 'An exam with the same proposed date and room already exists' });
        }

        const exam = await Exam.findOne(
            {
                where:
                    {id: examId}
            }
        )

        if(!exam) {
            return res.status(404).json({error: 'Exam not found'})
        }
        exam.status = 'ACCEPTED';
        exam.edited_at = new Date();
        exam.room = room;
        await exam.save();
        return res.status(200).json({ message: 'Exam status updated successfully', exam });

    } catch(error) {
        console.error('Error updating exam status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// exams with status review sent to secretary
router.get('/secretary/review', async (req, res) => {
    try {
        const exams = await Exam.findAll({
            where: {
                status: 'REVIEW'
            }
        });
        const reviewExams = exams.map(exam => {
            return {
                id: exam.id,
                professorName: exam.professor_name,
                subject: exam.subject,
                curriculum: exam.curriculum,
                studentYear: exam.student_year,
                proposedDate: exam.proposed_date,
                status: exam.status,
            }
        })
        res.json(reviewExams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// satus accepted sent to secretary
router.get('/secretary/accepted', async (req, res) => {
    try {
        const exams = await Exam.findAll({
            where: {
                status: 'ACCEPTED'
            }
        });
        const acceptedExams = exams.map(exam => {
            return {
                id: exam.id,
                professorName: exam.professor_name,
                subject: exam.subject,
                curriculum: exam.curriculum,
                studentYear: exam.student_year,
                proposedDate: exam.proposed_date,
                room: exam.room,
                status: exam.status,
            }
        })
        res.json(acceptedExams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//coordinator
router.get('/otherProfessors/:professorId/:coordinating', async (req, res) => {
    try {
        const professorId = req.params.professorId;
        const coordinating = req.params.coordinating;


        const exams = await Exam.findAll(
            {
                where: {
                    curriculum: coordinating,
                    professor_id: {
                        [Op.ne]: professorId
                    },
                    status: 'ACCEPTED',
                }
        });
        const otherExams = exams.map(exam => {
            return {
                id: exam.id,
                professorName: exam.professor_name,
                subject: exam.subject,
                curriculum: exam.curriculum,
                studentYear: exam.student_year,
                proposedDate: exam.proposed_date,
                room: exam.room,
                status: exam.status,
            }
        })

        res.json(otherExams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// runs every 24 hours and deletes past exams
cron.schedule('0 0 * * *', async () => {
    try {

        const examToBeDeleted = await Exam.destroy({
            where: {
                proposed_date: {
                    [Op.lt]: new Date()
                }
            }
        });

        console.log(`${examToBeDeleted} exams deleted.`);
    } catch (error) {
        console.error('Error deleting exams:', error);
    }
}, {
    scheduled: true,
    timezone: "Europe/Bucharest"
});

module.exports = router;