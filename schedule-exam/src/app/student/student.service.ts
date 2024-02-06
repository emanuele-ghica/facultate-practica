import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "../api/api.service";
import {Observable} from "rxjs";
import {AuthService} from "../Services/auth.service";
import {ExamDTO} from "../DTO/exam-dto";

@Injectable({
  providedIn: 'root',
})

export class StudentService {
  constructor(private _http: HttpClient,
              private _api: ApiService,
              private _auth: AuthService) {}


  public createExam(examData: any): Observable<any> {
    const examUrl = this._api.examUrl;
    const authToken = this._auth.getAuthToken();
    console.log(authToken);
    if(authToken) {
      const headers = new HttpHeaders({
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json'
      });
      return this._http.post(examUrl, examData, {headers});
    }
    return new Observable<any>()
  }

  getAllExams(): Observable<ExamDTO[]> {
    const examUrl = this._api.examUrl;
    const authToken = this._auth.getAuthToken();
    if(authToken) {
      const headers = new HttpHeaders({
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json'
      })
      return this._http.get<ExamDTO[]>(examUrl, {headers});
    }
    return new Observable<ExamDTO[]>();
  }

  private examData: any[] = [];

  addExamData(data: any) {
    this.examData.push(data);
  }

  getExamData() {
    return this.examData;
  }
}
