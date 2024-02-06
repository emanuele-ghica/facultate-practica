import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddExamComponent} from "./add-exam/add-exam.component";
import {StudentService} from "../student.service";
import {ExamDTO} from "../../DTO/exam-dto";

@Component({
  selector: 'app-student-homepage',
  templateUrl: './student-homepage.component.html',
  styleUrls: ['./student-homepage.component.css']
})
export class StudentHomepageComponent implements OnInit{

  exams: ExamDTO[] = [];

  // examData: any[];
  constructor(public dialog: MatDialog,
              private _studentService: StudentService) {
    // this.examData = this._studentService.getExamData();
  }

  ngOnInit() : void {
    this.getExams();
    console.log(this.getExams())

  }

  getExams(): void {
    this._studentService.getAllExams().subscribe(exams =>{
      this.exams = exams;
    })
  }
  openDialog() {
    this.dialog.open(AddExamComponent);
  }
}
