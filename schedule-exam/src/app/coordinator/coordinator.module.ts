import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatorHomepageComponent } from './coordinator-homepage/coordinator-homepage.component';
import {RouterModule} from "@angular/router";
import {SecretaryHomepageComponent} from "../secretary/secretary-homepage/secretary-homepage.component";
import {LoginComponent} from "../login/login.component";



@NgModule({
  declarations: [
    CoordinatorHomepageComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: CoordinatorHomepageComponent},
      {path: 'login', component:LoginComponent}
    ]),
    CommonModule
  ]
})
export class CoordinatorModule { }
