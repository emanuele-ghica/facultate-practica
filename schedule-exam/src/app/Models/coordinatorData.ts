
export class CoordinatorData{
  id: number;
  professorName: string;
  subject: string;
  examDate:string;
  studentYear: string;
  curriculum: string;
  startingHour: number;
  status: string;

  constructor(id: number, professorName:string, subject: string, examDate: string,studentYear:string, curriculum: string, startingHour:number, status: string) {
    this.id = id;
    this.professorName = professorName;
    this.subject = subject;
    this.examDate = examDate
    this.studentYear = studentYear;
    this.curriculum = curriculum;
    this.startingHour = startingHour;
    this.status = status;
  }
}
