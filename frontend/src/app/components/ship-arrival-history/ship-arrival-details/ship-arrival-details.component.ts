// src/app/components/sea-management/ship-arrival-details/ship-arrival-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeaManagementService } from '../../../services/sea-management.service';

@Component({
  selector: 'app-ship-arrival-details',
  templateUrl: './ship-arrival-details.component.html',
  styleUrls: ['./ship-arrival-details.component.scss']
})
export class ShipArrivalDetailsComponent implements OnInit {
  arrival: any;

  constructor(
    private route: ActivatedRoute,
    private seaManagementService: SeaManagementService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.seaManagementService.getShipArrivalById(id).subscribe(
      data => {
        if (data.success) {
          this.arrival = data.data;
        } else {
          console.error('Error fetching ship arrival details');
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  printDetails() {
    window.print();
  }
}
