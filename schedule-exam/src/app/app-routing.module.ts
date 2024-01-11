import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'secretary',
    loadChildren: () =>
      import('./secretary/secretary.module').then((m) =>
        m.SecretaryModule)
  },
  {
    path: 'professor',
    loadChildren: () =>
      import('./professor/professor.module').then((m) =>
        m.ProfessorModule)
  },
  {
    path: 'coordinator',
    loadChildren: () =>
      import('./coordinator/coordinator.module').then((m) =>
        m.CoordinatorModule)
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) =>
        m.StudentModule)
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    component: LoginComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
