import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretaryHomepageComponent } from './secretary-homepage/secretary-homepage.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {MatButtonModule} from "@angular/material/button";
import { SecretaryDialogComponent } from './secretary-homepage/secretary-dialog/secretary-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: SecretaryHomepageComponent},
      {path: 'login', component: LoginComponent}
    ]),
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  declarations: [
    SecretaryHomepageComponent,
    SecretaryDialogComponent
  ],
})
export class SecretaryModule { }
