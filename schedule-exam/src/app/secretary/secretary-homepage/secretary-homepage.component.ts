import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {SecretaryService} from "../secretary.service";
import {MatDialog} from "@angular/material/dialog";
import {SecretaryDialogComponent} from "./secretary-dialog/secretary-dialog.component";
import {AuthService} from "../../Services/auth.service";


@Component({
  selector: 'app-secretary-homepage',
  templateUrl: './secretary-homepage.component.html',
  styleUrls: ['./secretary-homepage.component.css']
})
export class SecretaryHomepageComponent implements OnInit{

  mappedReview: Observable<any[]> | undefined;

  mappedAccepted: Observable<any[]> | undefined;

  constructor(
    private _secretary: SecretaryService,
    private dialog: MatDialog,
    private _auth: AuthService
  ) { }


  ngOnInit() {
    this.reloadExams();

  }

  showAcceptedTable: boolean = true;
  showReviewTable: boolean = false

  displayAccepted() {
    this.showAcceptedTable = true;
    this.showReviewTable = false;
  }

  displayPending() {
    this.showAcceptedTable = false;
    this.showReviewTable = true;
  }


  openDialog(id: number, proposedDate: string): void {
    const dialogRef = this.dialog.open(SecretaryDialogComponent, {
      data: {id: id, proposedDate: proposedDate}
    })
    dialogRef.afterClosed().subscribe(
      () => {
        this.reloadExams();
      }
    )
  }

  deleteExam(examId: number): void {
    this._secretary.deleteExamById(examId).subscribe(
      () => {
        this.reloadExams();
      },
      (error) => {
        console.error('Error deleting exam:', error)
      }
    )
  }

  reloadExams() : void {
    this.mappedReview = this._secretary.getExamByStatusReview()
    this.mappedAccepted = this._secretary.getExamByStatusAccepted();
  }


  logout() : void {
    this._auth.logout().subscribe(() => {
      localStorage.removeItem('token')
    })
  }



}
