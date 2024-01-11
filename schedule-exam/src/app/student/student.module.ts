import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomepageComponent } from './student-homepage/student-homepage.component';
import { AddExamComponent } from './student-homepage/add-exam/add-exam.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    StudentHomepageComponent,
    AddExamComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: StudentHomepageComponent},
      {path: 'login', component: LoginComponent}
    ]),
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class StudentModule { }
