import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorHomepageComponent } from './professor-homepage/professor-homepage.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {AuthGuard} from "../guard/auth.guard";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ProfessorHomepageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProfessorHomepageComponent,
        // canActivate: [AuthGuard],
        data: {expectedRole: 'professor'}
      },
      {path: 'login', component: LoginComponent}
    ]),
    CommonModule,
    MatButtonModule
  ]
})
export class ProfessorModule { }
