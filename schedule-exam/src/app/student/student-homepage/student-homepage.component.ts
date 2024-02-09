import {Component, Injectable, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddExamComponent} from "./add-exam/add-exam.component";
import {StudentService} from "../student.service";
import {AuthService} from "../../Services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-student-homepage',
  templateUrl: './student-homepage.component.html',
  styleUrls: ['./student-homepage.component.css']
})
export class StudentHomepageComponent implements OnInit{

  mappedExams: Observable<any[]> | undefined;

  constructor(public dialog: MatDialog,
              private _studentService: StudentService,
              private _auth: AuthService) {
  }

  ngOnInit() : void {
   this.reloadExams();
  }

  reloadExams() : void {
    this.mappedExams = this._studentService.getExamsByUserId(this._auth.getUserId());
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddExamComponent);
    dialogRef.afterClosed().subscribe(
      () => {
        this.reloadExams();
      }
    )
  }

  deleteExam(examId: number): void {
    this._studentService.deleteExamById(examId).subscribe(
      () => {
        console.log('Exam deleted successfully')
        this.reloadExams();
      },
      (error) => {
        console.error('Error deleting exam:', error)
      }
    )
  }

}
