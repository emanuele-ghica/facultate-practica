import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectModel} from "./subject.model";
import {ProfessorModel} from "./professor.model";
import {StudentService} from "../../student.service";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit{

  constructor(private _formBuilder: FormBuilder,
              private _studentService: StudentService) {}
  public addForm!: FormGroup;
  professorsNames: ProfessorModel[] = [
    {value: 'test-1', viewValue: 'Test 1'},
    {value: 'test-2', viewValue: 'Test 2'},
    {value: 'test-3', viewValue: 'Test 3'},
  ]

  subjectNames: SubjectModel[] = [
    {value: 'subject-test-1', viewValue: 'Subject 1'},
    {value: 'subject-test-2', viewValue: 'Subject 2'},
    {value: 'subject-test-3', viewValue: 'Subject 3'},
    {value: 'subject-test-4', viewValue: 'Subject 4'},
  ]

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
  }

  postExam() {
    const myDate: string = this.addForm.get('date')?.value;

    const formattedDate = new Date(myDate).toLocaleString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      })

    let startingHour: string = '';
    startingHour = this.addForm.value.startingHour+ ':00:00.000Z'
    let dateTimeString: string = '';
    dateTimeString = `${formattedDate} ${startingHour}`;
    let isoDateTime = new Date(dateTimeString).toISOString();
    console.log(typeof isoDateTime);

    if(this.addForm.valid) {
      const examData = {
        curriculum: this.addForm.value.subject,
        studentYear: 'III',
        room: 'room-1',
        LocalDateTime: isoDateTime,
        examStatus: 'PROPOSED',
        teachers: [
          {
            username: this.addForm.value.professor,
          }
        ]
      }
      console.log(examData);
      this._studentService.createExam(examData).subscribe(
        (response) => {
          console.log('Exam created successfully:', response);
        },
        (error) => {
          console.error('Error creating exam:', error);
        }
      );
    }
  }
}
