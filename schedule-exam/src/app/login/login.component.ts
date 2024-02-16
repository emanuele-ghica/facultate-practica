import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../Services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm!: FormGroup
  public invalidCredentials: boolean = false;
  constructor(private _formBuilder: FormBuilder, private _router: Router, private _authService: AuthService, private _http: HttpClient) {

    this.loginForm = this._formBuilder.group({
      email: ['',
        [
        Validators.required, Validators.email
        ]
      ],
      password: ['',
        [
        Validators.required,
        ]
      ]
    })
  }

  submit() :void {
    if(!this.loginForm.valid) {
      this.invalidCredentials = true;
    }
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this._authService.login(credentials).subscribe(
        (response) => {
          this._authService.setToken(response.token);
          console.log('Login successful', response);
          if(response.token) {
            const userRole = this._authService.decodeToken(response.token).role;
            const userId = this._authService.decodeToken(response.token).id;
            const userStudentYear = this._authService.decodeToken(response.token).studentYear;
            const userCurriculum = this._authService.decodeToken(response.token).curriculum;
            const coordinating = this._authService.decodeToken(response.token).coordinating
            this._authService.setUserRole(userRole);
            this._authService.setUserStudentYear(userStudentYear);
            this._authService.setUserCurriculum(userCurriculum);
            this._authService.setUserId(userId);
            this._authService.setUserCoordinating(coordinating)
            this._authService.redirectToRolePage(userRole)
          }
        },
        (error) => {
          console.error('Login error', error);
            this.invalidCredentials = true;
        }
      );
    }

  }



}
