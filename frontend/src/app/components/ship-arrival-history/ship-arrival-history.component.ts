// src/app/components/sea-management/ship-arrival-history/ship-arrival-history.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeaManagementService } from '../../services/sea-management.service';

@Component({
  selector: 'app-ship-arrival-history',
  templateUrl: './ship-arrival-history.component.html',
  styleUrls: ['./ship-arrival-history.component.scss']
})
export class ShipArrivalHistoryComponent implements OnInit {
  arrivals: any[] = [];

  constructor(private seaManagementService: SeaManagementService, private router: Router) { }

  ngOnInit() {
    this.fetchShipArrivals();
  }

  fetchShipArrivals() {
    this.seaManagementService.getShipArrivals().subscribe(data => {
      this.arrivals = data;
    });
  }

  generateNumber(shipId: string) {
    this.seaManagementService.generateShipNumber(shipId).subscribe(
      (updatedShip) => {
        // Update the UI with the new number
        const index = this.arrivals.findIndex(arrival => arrival._id === shipId);
        if (index !== -1) {
          this.arrivals[index] = updatedShip;
        }
      },
      (error) => {
        console.error('Error generating number:', error);
      }
    );
  }

  viewDetails(arrival: any) {
    if (arrival) {
      this.router.navigate(['/ship-arrival-details', arrival]);
    } else {
      console.error('Arrival ID is undefined or null');
    }
  }
}
