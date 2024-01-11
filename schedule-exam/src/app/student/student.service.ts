import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class StudentService {
  private examData: any[] = [];

  addExamData(data: any) {
    this.examData.push(data);
  }

  getExamData() {
    return this.examData;
  }
}
