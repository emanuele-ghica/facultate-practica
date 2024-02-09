import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable ({
  providedIn: 'root',
})
export class AddExamService {
  private _baseUrl = 'http://localhost:3000/api/exams'

  constructor(private _http: HttpClient) {
  }

  getProfessors() : Observable<any[]> {
    return this._http.get<any[]>(`${this._baseUrl}/users/professors`);
  }
}
