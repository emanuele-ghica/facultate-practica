import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {

  constructor(
    private _http: HttpClient,
    private _api:ApiService) {}

  public getExamByStatusReview(): Observable<any[]> {
    const url = `${this._api.examUrl}/secretary/review`
    return this._http.get<any[]>(url);
  }

  public acceptExamById(examData: any): Observable<any> {
    const url = `${this._api.examUrl}/${examData.id}/accept`
    return this._http.put(url, examData);
  }

  public deleteExamById(examId: number): Observable<void> {
    const deleteUrl = `${this._api.examUrl}/delete/${examId}`
    return this._http.delete<void>(deleteUrl);
  }

  public getExamByStatusAccepted(): Observable<any[]> {
    const url = `${this._api.examUrl}/secretary/accepted`
    return this._http.get<any[]>(url);
  }


}
