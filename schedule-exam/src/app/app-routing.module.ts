import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'secretary',
    loadChildren: () =>
      import('./secretary/secretary.module').then((m) =>
        m.SecretaryModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'secretary'}
  },
  {
    path: 'professor',
    loadChildren: () =>
      import('./professor/professor.module').then((m) =>
        m.ProfessorModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'professor'}
  },
  {
    path: 'coordinator',
    loadChildren: () =>
      import('./coordinator/coordinator.module').then((m) =>
        m.CoordinatorModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'coordinator'}
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) =>
        m.StudentModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'student'}
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
