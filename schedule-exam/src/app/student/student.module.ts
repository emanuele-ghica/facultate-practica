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
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MAT_DATE_LOCALE} from "@angular/material/core";

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
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'ro'},
    ]
})
export class StudentModule { }

