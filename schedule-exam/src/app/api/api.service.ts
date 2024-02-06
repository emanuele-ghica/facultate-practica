import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api'


  get examUrl(): string {
    return `${this.baseUrl}/exams`;
  }
  constructor() { }
}
