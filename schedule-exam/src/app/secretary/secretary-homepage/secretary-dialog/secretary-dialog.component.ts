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
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  public acceptForm!: FormGroup;

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

  updateExam() {
    if(this.acceptForm.valid) {
      let id: number = 0
      id = this.data.id
      let room: string = ''
      room = this.acceptForm.value.room
      this._secretary.acceptExamById(id, room).subscribe(
        response => {
          console.log('Exam status updates successfully', response);
        },
        error => {
          console.error('error updating exam status:', error);
        }
      )
    }
  }

}
