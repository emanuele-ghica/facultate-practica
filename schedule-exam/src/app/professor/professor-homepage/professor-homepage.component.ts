
import {Component, OnInit} from '@angular/core';
import {ProfData} from "../../Models/profData";
import {Observable} from "rxjs";
import {ProfessorService} from "../professor.service";
import {AuthService} from "../../Services/auth.service";


@Component({
  selector: 'app-professor-homepage',
  templateUrl: './professor-homepage.component.html',
  styleUrls: ['./professor-homepage.component.css']
})
export class ProfessorHomepageComponent implements OnInit{

  constructor(private _professorService: ProfessorService,
              private _auth: AuthService) {}
  mappedExams: Observable<any[]> | undefined;
  acceptedExams: Observable<any[]> | undefined;

  ngOnInit() {
    this.reloadExams();
  }


  reloadExams() : void {
    this.mappedExams = this._professorService.getExamByStatusPR(this._auth.getUserId())
    this.acceptedExams = this._professorService.getExamByStatusAccepted(this._auth.getUserId());

  }

  showAcceptedTable: boolean = true;
  showPendingTable: boolean = false;

  displayAccepted() {
    this.showAcceptedTable = true;
    this.showPendingTable = false;
  }

  displayPending() {
    this.showAcceptedTable = false;
    this.showPendingTable = true;
  }


  acceptExam(examId: number) {
    this._professorService.acceptExamById(examId).subscribe(
      () => {
        console.log('Exam is now being reviewed')
        this.reloadExams();
      }
    )
  }
  deleteExam(examId: number): void {
    this._professorService.deleteExamById(examId).subscribe(
      () => {
        console.log('Exam deleted successfully')
        this.reloadExams();
      },
      (error) => {
        console.error('Error deleting exam:', error)
      }
    )
  }

  logout() : void {
    this._auth.logout().subscribe(() => {
      localStorage.removeItem('token')
      console.log(localStorage.getItem('token'));
    })
  }
}
