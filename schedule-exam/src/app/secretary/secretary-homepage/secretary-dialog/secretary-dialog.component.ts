import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecretaryService} from "../../secretary.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-secretary-dialog',
  templateUrl: './secretary-dialog.component.html',
  styleUrls: ['./secretary-dialog.component.css']
})
export class SecretaryDialogComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _secretary: SecretaryService,
    public dialogRef: MatDialogRef<SecretaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, proposedDate: string }
  ) {}

  public acceptForm!: FormGroup;

  public hasError: boolean = true;

  errorMessage: string = '';

  ngOnInit():void {
    this.acceptForm = this._formBuilder.group({
      room: [
        '',
        [
          Validators.required
        ]
      ]
    })
  }

  classrooms = [
    { label: 'PP1', value: 'PP1' },
    { label: 'PI1', value: 'PI1' },
    { label: 'PI2', value: 'PI2' },
    { label: 'PII1', value: 'PII1' },
    { label: 'PII7', value: 'PII7' },
    { label: 'PIII1', value: 'PIII1' },
    { label: 'PIII2', value: 'PIII2' }
  ];

  updateExam() {
    if(this.acceptForm.valid) {
      let id: number = 0;
      let proposedDate: string = '';
      let room: string = '';
      id = this.data.id;

      let parsedDate = new Date(this.data.proposedDate)
      const isDaylightSavingTime = this.isDaylightSavingTime(parsedDate);

      if (isDaylightSavingTime) {
        // If daylight saving time, add 1 hour (GMT+3)
        parsedDate.setHours(parsedDate.getHours() + 3);
      } else {
        // If not daylight saving time, add 2 hours (GMT+2)
        parsedDate.setHours(parsedDate.getHours() + 2);
      }

      console.log(this.data.proposedDate);

      proposedDate = parsedDate.toISOString();


      room = this.acceptForm.value.room
      console.log(proposedDate);
      const requestBody = {
        id: id,
        proposedDate: proposedDate,
        room: room,
      }
      this._secretary.acceptExamById(requestBody).subscribe(
        response => {
          console.log('Exam status updates successfully', response);
          this.hasError = false;
          if(!this.hasError) {
            this.dialogRef.close();
          }
        },
        (error) => {
          this.hasError = true;
          console.error('error updating exam status:', error);
          if (error.status === 409) {
            this.errorMessage = 'An exam with the same proposed date and room already exists';
          } else if (error.status === 400) {
            this.errorMessage = 'Exam not found';
          } else {
            this.errorMessage = 'An error occurred while creating the exam';
          }
        }
      )
    }
  }

  isDaylightSavingTime(date: Date): boolean {
    const year = date.getFullYear();
    const lastSundayOfMarch = this.getLastSundayOfMonth(year, 2);
    const lastSundayOfOctober = this.getLastSundayOfMonth(year, 9);
    return date >= lastSundayOfMarch && date < lastSundayOfOctober;
  }

  getLastSundayOfMonth(year: number, month: number): Date {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const dayOfWeek = lastDayOfMonth.getDay();
    const lastSunday = new Date(lastDayOfMonth);
    lastSunday.setDate(lastDayOfMonth.getDate() - dayOfWeek);
    return lastSunday;
  }

}
