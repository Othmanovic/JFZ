import { Component } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  arrivalsWithShipNumber: any[] = [];

  constructor(private seaManagementService: SeaManagementService, private router: Router) {}

  ngOnInit() {
    this.fetchShipArrivalsWithShipNumber();
  }

  fetchShipArrivalsWithShipNumber() {
    this.seaManagementService.getShipArrivals().subscribe(data => {
      // Filter ships that have a shipNumber
      this.arrivalsWithShipNumber = data.filter(arrival => arrival.shipNumber);
    });
  }

}
