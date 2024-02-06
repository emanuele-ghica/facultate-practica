import { Injectable} from "@angular/core";
import {User} from "../Models/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = 'http://localhost:8080'
  private authToken: string | null = null;

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this._baseUrl}/login`;
    return this._http.post(url, {username, password});
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('auth_token', token)
  }

  getAuthToken(): string | null {
    if(!this.authToken) {
      this.authToken = localStorage.getItem('auth_token');
    }
    return this.authToken;
  }

  logout(): void {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }


}
