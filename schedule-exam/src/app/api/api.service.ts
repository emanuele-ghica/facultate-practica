import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api'


  get examUrl(): string {
    return `${this.baseUrl}/exams`;
  }

  constructor() { }
}
