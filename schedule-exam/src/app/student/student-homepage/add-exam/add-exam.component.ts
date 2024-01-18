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
          Validators.required
        ],
      ]
    })
  }


  postExam() {
    const myDate: string = this.addForm.get('date')?.value;
    const formattedDate = new Date(myDate).toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
      })
    if(this.addForm.valid) {
      this.addForm.get('date')?.patchValue(formattedDate);
      const examData = this.addForm.value;
      this._studentService.addExamData(examData);
    }
  }
}
