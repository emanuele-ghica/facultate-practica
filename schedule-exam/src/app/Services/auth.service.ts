import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = 'http://localhost:3000/api/auth'
  private _userRole: string | undefined;
  private _studentYear: string | undefined;
  private _studentCurriculum: string | undefined;
  private _userId: number | undefined;
  private _coordinating: string | undefined;

  constructor(private _http: HttpClient,
              private _router: Router) { }

  login(credentials: {email: string, password:string}): Observable<any> {

    return this._http.post(`${this._baseUrl}/login`, credentials,  { withCredentials: true });
  }

  logout(): Observable<any> {
    return this._http.post(`${this._baseUrl}/logout`, {})
  }

  setUserRole(role: string): void {
    this._userRole =  role;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    console.log('Token:', token);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        return decodedToken.role;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  setUserStudentYear(studentYear: string) : void {
    this._studentYear = studentYear
  }

  setUserCurriculum(studentCurriculum: string) : void {
    this._studentCurriculum = studentCurriculum
  }

  setUserId(userId: number) : void {
    this._userId = userId
  }

  setUserCoordinating(coordinating: string) : void {
    this._coordinating = coordinating
  }

  getUserCoordinating() : string {
    return <string>this._coordinating;
  }
  getUserStudentYear() : string {
    return <string>this._studentYear
  }

  getUserCurriculum() : string {
    return <string>this._studentCurriculum;
  }
  getUserId() : number {
    return <number>this._userId;
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }


  getUserInfo():  { id: number, role: string, coordinating: string, curriculum: string, studentYear: string} | null {
    const token = this.getToken();
    console.log('Token:', token);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the token
        console.log('Decoded token:', decodedToken);
        return { id: decodedToken.id, role: decodedToken.role, coordinating: decodedToken.coordinating, curriculum: decodedToken.curriculum, studentYear: decodedToken.studentYear };
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  public redirectToRolePage(userRole: string | null): void {
    switch (userRole) {
      case 'student':
        this._router.navigate(['/student']);
        break;
      case 'professor':
        this._router.navigate(['/professor']);
        break;
      case 'coordinator':
        this._router.navigate(['/coordinator']);
        break;
      case 'secretary':
        this._router.navigate(['/secretary']);
        break;
      default:
        this._router.navigate(['/login']);
        break;
    }
  }


}
