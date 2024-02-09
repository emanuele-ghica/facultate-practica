import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "../api/api.service";
import {Observable} from "rxjs";
import {AuthService} from "../Services/auth.service";

@Injectable({
  providedIn: 'root',
})

export class StudentService {
  constructor(private _http: HttpClient,
              private _api: ApiService) {}

  public createExam(examData: any): Observable<any> {
    const examUrl = this._api.examUrl;
      return this._http.post(examUrl, examData);
  }


  public getExamsByUserId(userId: number): Observable<any[]> {
    const userByIdUrl = `${this._api.examUrl}/user/${userId}`;
    return this._http.get<any[]>(userByIdUrl)
  }

  public deleteExamById(examId: number): Observable<void> {
    const deleteUrl = `${this._api.examUrl}/delete/${examId}`
    return this._http.delete<void>(deleteUrl)

  }


}
