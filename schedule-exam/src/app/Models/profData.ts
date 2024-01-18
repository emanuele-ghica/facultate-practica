export class ProfData {
  id: number;
  subject: string;
  examDate:string;
  studentYear: string;
  curriculum: string;
  startingHour: number;
  status: string;


  constructor(id: number, subject: string, examDate: string,studentYear:string, curriculum: string, startingHour:number, status: string) {
    this.id = id;
    this.subject = subject;
    this.examDate = examDate
    this.studentYear = studentYear;
    this.curriculum = curriculum;
    this.startingHour = startingHour;
    this.status = status;
  }

}
