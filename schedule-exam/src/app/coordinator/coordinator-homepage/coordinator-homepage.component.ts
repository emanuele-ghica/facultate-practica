import {Component, OnInit} from '@angular/core';
import {ProfData} from "../../Models/profData";
import {CoordinatorData} from "../../Models/coordinatorData";
import {CoordinatorService} from "../coordinator.service";
import {AuthService} from "../../Services/auth.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-coordinator-homepage',
  templateUrl: './coordinator-homepage.component.html',
  styleUrls: ['./coordinator-homepage.component.css']
})
export class CoordinatorHomepageComponent implements OnInit{


  data: ProfData[] = [
    new ProfData(1, 'TW', '20.01.2024', 'III', 'IAG', 12, 'Accepted'),
    new ProfData(2, 'SAP', '24.01.2024', 'II', 'IA', 10, 'Pending'),
    new ProfData(3, 'SSI', '30.01.2024', 'I', 'MI', 8, 'Accepted'),

  ]



  otherFilteredData: CoordinatorData[] = [];



  constructor(
    private _coordinator: CoordinatorService,
    private _auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.reloadExams();
  }

  showAcceptedTable: boolean = true;
  showPendingTable: boolean = false;
  showOtherTable: boolean = false;
  mappedExams: Observable<any[]> | undefined;
  acceptedExams: Observable<any[]> | undefined;
  otherExams: Observable<any[]> | undefined;
  reloadExams() : void {
    this.mappedExams = this._coordinator.getExamByStatusPR(this._auth.getUserId())
    this.acceptedExams = this._coordinator.getExamByStatusAccepted(this._auth.getUserId())
    this.otherExams = this._coordinator.getOtherAcceptedExams(this._auth.getUserId(), this._auth.getUserCoordinating())

  }


  acceptExam(examId: number) {
    this._coordinator.acceptExamById(examId).subscribe(
      () => {
        console.log('Exam is now being reviewed')
        this.reloadExams();
      }
    )
  }
  deleteExam(examId: number): void {
    this._coordinator.deleteExamById(examId).subscribe(
      () => {
        console.log('Exam deleted successfully')
        this.reloadExams();
      },
      (error) => {
        console.error('Error deleting exam:', error)
      }
    )
  }

  displayAccepted(): void {
    this.showAcceptedTable = true;
    this.showPendingTable = false;
    this.showOtherTable = false;
  }

  displayPending() {
    this.showAcceptedTable = false;
    this.showPendingTable = true;
    this.showOtherTable = false;
  }

  displayOther(): void {
    this.showAcceptedTable = false;
    this.showPendingTable = false;
    this.showOtherTable = true;
  }
}
