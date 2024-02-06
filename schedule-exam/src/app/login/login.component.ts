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
export class LoginComponent implements OnInit {

  public hide = true;
  public loginForm!: FormGroup
  constructor(private _formBuilder: FormBuilder, private _router: Router, private _authService: AuthService, private _http: HttpClient) {

  }
  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        ]
      ],
      password: ['', [
        Validators.required,
        ]
      ]
    })
  }


  submit() :void {
    if(this.loginForm.invalid) {
      console.log('Invalid form. Please check your inputs');
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this._http.post<any>(`http://localhost:8080/login?username=${email}&password=${password}`, {email, password}).subscribe(
      response => {
        if(response.result && response.result.token) {
          const token = response.result.token;
          localStorage.setItem('auth_token', token)
          console.log('Authentication token:', token);
          this._router.navigate(['/student']);
        } else {
          console.log('Login failure 1');
        }
      },
      error => {
        console.error('Login failure 2', error);
      }
    )

    // const isAuthenticated = this._authService.login('test2@test2.com', 'test')


    // if(isAuthenticated) {
    //   const userRole = this._authService.getCurrentUser()?.role;
    //
    //   console.log(userRole)
    //
    //   switch (userRole) {
    //     case 'student':
    //       this._router.navigate(['/student']);
    //       break;
    //     case 'professor':
    //       this._router.navigate(['/professor']);
    //       break;
    //     case 'professor-coordinator':
    //       this._router.navigate(['/coordinator']);
    //       break;
    //     case 'secretary':
    //       this._router.navigate(['/secretary']);
    //       break;
    //     default:
    //       console.log('Login failed.');
    //   }
    // }
  }



}
