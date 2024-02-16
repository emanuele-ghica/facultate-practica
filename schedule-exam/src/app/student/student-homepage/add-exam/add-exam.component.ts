import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../student.service";
import {AddExamService} from "./add-exam.service";
import {Subject} from "../../../Models/subject";
import {AuthService} from "../../../Services/auth.service";
import {Observable} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StudentHomepageComponent} from "../student-homepage.component";
@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit{
  constructor(private _formBuilder: FormBuilder,
              private _studentService: StudentService,
              private _addExamService: AddExamService,
              private _auth: AuthService,
              public dialogRef: MatDialogRef<StudentHomepageComponent>
             ) {}
  public addForm!: FormGroup;
  professorData: any[] = [];
  professorNames: string[] = [];

  selectedProfessor: any = null;
  subjects: Subject[] = []
  selectedProfessorID: number = 0;
  userInfo = this._auth.getUserInfo();

  public hasError: boolean = true;
  errorMessage: string = '';

  ngOnInit():void {
    this.addForm = this._formBuilder.group({
      professor: [
        '',
        [
          Validators.required
        ],
      ],
      subject: [
        '',
        [
          Validators.required
        ],
      ],
      date: [
        '',
        [
          Validators.required
        ],
      ],
      startingHour: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ],
      ]
    })

    this._addExamService.getProfessors().subscribe(
      (professorData)=> {
        this.professorData = professorData;
        this.professorNames = professorData.map(professor => professor.full_name);
      },
      (error) => {
        console.error("Error fetching professors:", error);
      })
  }

  onSelectProfessor(selectedProfessorName: string): void {
    this.selectedProfessor = this.professorData.find(professor => professor.full_name === selectedProfessorName);
    if (this.selectedProfessor) {
      this.subjects = this.selectedProfessor.subjects.map((subject: Subject) => subject.subject_name);
      const professorId = this.selectedProfessor.id;
      this.selectedProfessorID = professorId;
    }
  }

  postExam() {
    const myDate: string = this.addForm.get('date')?.value;

    const formattedDate = new Date(myDate).toLocaleString('us-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      })

    let startingHour: string = '';
    let numberHour: number = 0;
    if(this.addForm.value.startingHour) {
      numberHour = parseInt(this.addForm.value.startingHour, 10)
      if (numberHour >= 8 && numberHour <= 20) {
        startingHour = this.addForm.value.startingHour+ ':00:00.000Z'
        let dateTimeString: string = '';
        dateTimeString = `${formattedDate} ${startingHour}`;
        let isoDateTime: string = '';
        isoDateTime = new Date(dateTimeString).toISOString();

        if(this.addForm.valid) {
          const examData = {
            professorName: this.addForm.value.professor,
            professorId: this.selectedProfessorID,
            subject: this.addForm.value.subject,
            curriculum: this.userInfo?.curriculum,
            studentYear: this.userInfo?.studentYear,
            LocalDateTime: isoDateTime,
            studentId: this._auth.getUserId(),
          }
          this._studentService.createExam(examData).subscribe(
            (response) => {
              console.log('Exam created successfully:', response);
              this.hasError = false;
              if(!this.hasError) {
                  this.dialogRef.close();
              }
            },
            (error) => {
              this.hasError = true;
              console.error('Error creating exam', error);
              if (error.status === 409) {
                this.errorMessage = 'An exam with these details already exists';
              } else if (error.status === 400) {
                this.errorMessage = 'The proposed date and time cannot be in the past';
              } else {
                this.errorMessage = 'An error occurred while creating the exam';
              }
            }
          )
        }
      } else {
        this.errorMessage = 'Starting hour must be between 8 and 20';
      }
    }
  }
}
