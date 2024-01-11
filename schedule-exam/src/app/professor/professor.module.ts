import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorHomepageComponent } from './professor-homepage/professor-homepage.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login.component";



@NgModule({
  declarations: [
    ProfessorHomepageComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: ProfessorHomepageComponent},
      {path: 'login', component:LoginComponent}
    ]),
    CommonModule
  ]
})
export class ProfessorModule { }
