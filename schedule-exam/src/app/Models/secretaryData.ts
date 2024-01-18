export class SecretaryData {
  id: number;
  professorName: string;
  subject: string;
  examDate:string;
  studentYear: string;
  curriculum: string;
  startingHour: number;
  substituteTeacher: string;
  examClass: string;
  status: string;

  constructor(id: number, professorName:string, subject: string, examDate: string,studentYear:string, curriculum: string, startingHour:number, substituteTeacher: string, examClass: string, status: string) {
    this.id = id;
    this.professorName = professorName;
    this.subject = subject;
    this.examDate = examDate
    this.studentYear = studentYear;
    this.curriculum = curriculum;
    this.startingHour = startingHour;
    this.substituteTeacher = substituteTeacher;
    this.examClass= examClass;
    this.status = status;
  }


}
