import {Component, OnInit} from '@angular/core';
import {ProfData} from "../../Models/profData";
import {CoordinatorData} from "../../Models/coordinatorData";


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

  coordinatorData: CoordinatorData[] = [
    new CoordinatorData(1, 'Test1', 'TW', '20.01.2024', 'III', 'IAG', 12, 'Accepted'),
    new CoordinatorData(2, 'Test2', 'SAP', '24.01.2024', 'II', 'IA', 10, 'Pending'),
    new CoordinatorData(3,  'Test3', 'SSI', '30.01.2024', 'I', 'MI', 8, 'Accepted'),

  ]

  filteredData: ProfData[] = [];
  otherFilteredData: CoordinatorData[] = [];
  showDeleteButton: boolean = false;
  showMyTable: boolean = true;
  showOtherTable: boolean = false;

  ngOnInit() {
    this.displayAccepted()
  }

  displayAccepted(): void {
    this.filteredData = this.data.filter((item) => item.status === 'Accepted');
    this.showDeleteButton = false;
    this.showMyTable = true;
    this.showOtherTable = false;
  }

  displayPending() {
    this.filteredData = this.data.filter((item) => item.status === 'Pending');
    this.showDeleteButton = true;
    this.showMyTable = true;
    this.showOtherTable = false;
  }

  displayOtherAccepted(): void {
    this.otherFilteredData = this.coordinatorData.filter((item) => item.status === 'Accepted')
    this.showMyTable = false;
    this.showOtherTable = true;
  }
  displayOtherPending(): void {
    this.otherFilteredData = this.coordinatorData.filter((item) => item.status === 'Pending')
    this.showMyTable = false;
    this.showOtherTable = true;
  }
}
