import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretaryHomepageComponent } from './secretary-homepage/secretary-homepage.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login.component";



@NgModule({
  declarations: [
    SecretaryHomepageComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: SecretaryHomepageComponent},
      {path: 'login', component:LoginComponent}
    ]),
    CommonModule
  ]
})
export class SecretaryModule { }
