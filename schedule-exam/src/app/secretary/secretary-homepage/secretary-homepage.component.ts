import {Component, OnInit} from '@angular/core';
import {SecretaryData} from "../../Models/secretaryData";


@Component({
  selector: 'app-secretary-homepage',
  templateUrl: './secretary-homepage.component.html',
  styleUrls: ['./secretary-homepage.component.css']
})
export class SecretaryHomepageComponent implements OnInit{
  secretaryData: SecretaryData[] = [
    new SecretaryData(1, 'Test1', 'TW', '20.01.2024', 'III', 'IAG', 12,  'Nume Test', 'PII7', 'Accepted'),
    new SecretaryData(2, 'Test2', 'SAP', '24.01.2024', 'II', 'IA', 10, '', '', 'Pending'),
    new SecretaryData(3,  'Test3', 'SSI', '30.01.2024', 'I', 'MI', 8, '', '', 'Pending'),
  ]

  constructor() {

  }

  filteredData: SecretaryData[] = [];

  showDeleteButton: boolean = false;
  showModifyButton: boolean = false;

  ngOnInit() {
    this.displayAccepted();
  }


  displayAccepted(): void {
    this.filteredData = this.secretaryData.filter((item) => item.status === 'Accepted');
    this.showDeleteButton = false;
    this.showModifyButton = false;
  }


  displayPending() {
    this.filteredData = this.secretaryData.filter((item) => item.status === 'Pending');
    this.showDeleteButton = true;
    this.showModifyButton = true;
  }

  // openDialog() {
  //   this.dialog.open(ModifyExamComponent);
  // }

}
