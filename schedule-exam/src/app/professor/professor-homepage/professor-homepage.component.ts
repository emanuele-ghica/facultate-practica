import {Component, OnInit} from '@angular/core';
import {ProfData} from "../../Models/profData";


@Component({
  selector: 'app-professor-homepage',
  templateUrl: './professor-homepage.component.html',
  styleUrls: ['./professor-homepage.component.css']
})
export class ProfessorHomepageComponent implements OnInit{


  data: ProfData[] = [
    new ProfData(1, 'TW', '20.01.2024', 'III', 'IAG', 12, 'Accepted'),
    new ProfData(2, 'SAP', '24.01.2024', 'II', 'IA', 10, 'Pending'),
    new ProfData(3, 'SSI', '30.01.2024', 'I', 'MI', 8, 'Accepted'),

  ]
  filteredData: ProfData[] = [];
  showDeleteButton: boolean = false;

  ngOnInit() {
    this.displayAccepted();
  }



  displayAccepted(): void {
    this.filteredData = this.data.filter((item) => item.status === 'Accepted');
    this.showDeleteButton = false;
  }

  displayPending() {
    this.filteredData = this.data.filter((item) => item.status === 'Pending');
    this.showDeleteButton = true;
  }

}
