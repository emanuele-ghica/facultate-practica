import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private _http: HttpClient,
              private _api: ApiService) { }

  public getExamByStatusPR(professorId: number): Observable<any[]> {
    const professorByIdUrl = `${this._api.examUrl}/professor/${professorId}`;
    return this._http.get<any[]>(professorByIdUrl)

  }

  public deleteExamById(examId: number): Observable<void> {
    const deleteUrl = `${this._api.examUrl}/delete/${examId}`
    return this._http.delete<void>(deleteUrl);
  }

  public acceptExamById(examId: number): Observable<any> {
    const url = `${this._api.examUrl}/${examId}/review`
    return this._http.put(url, {});
  }

  public getExamByStatusAccepted(professorId: number): Observable<any[]> {
    const professorByIdUrl = `${this._api.examUrl}/professorAccepted/${professorId}`;
    return this._http.get<any[]>(professorByIdUrl)

  }
}
