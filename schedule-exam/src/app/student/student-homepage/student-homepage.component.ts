import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddExamComponent} from "./add-exam/add-exam.component";
import {StudentService} from "../student.service";

@Component({
  selector: 'app-student-homepage',
  templateUrl: './student-homepage.component.html',
  styleUrls: ['./student-homepage.component.css']
})
export class StudentHomepageComponent {

  examData: any[];
  constructor(public dialog: MatDialog,
              private _studentService: StudentService) {
    this.examData = this._studentService.getExamData();
  }

  openDialog() {
    this.dialog.open(AddExamComponent);
  }
}
