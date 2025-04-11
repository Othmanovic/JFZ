import { Component } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  seaManagementData: any[] = [];

  constructor(private seaManagementService: SeaManagementService, private router: Router) {}

  ngOnInit() {
    this.fetchShipArrivalsWithShipNumber();
  }

  fetchShipArrivalsWithShipNumber() {
    this.seaManagementService.fetchSeaManagement().subscribe(
      (data) => {
        this.seaManagementData = data;
        console.log('Sea Management Data:', this.seaManagementData);
      },
      (error) => {
        console.error('Error fetching sea management data:', error);
      }
    );
  }

}
