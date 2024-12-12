import { Component, OnInit } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';

@Component({
  selector: 'app-e3dad',
  templateUrl: './e3dad.component.html',
  styleUrl: './e3dad.component.scss'
})
export class E3dadComponent implements OnInit {
  ships: any[] = [];
  selectedShipPolicies: any[] = [];
  showPolicies: boolean = false;
  selectedShipName: string = ''; // Name of the selected ship


  constructor(private seaManagementService: SeaManagementService) { }

  ngOnInit(): void {
    this.fetchShips();
    console.log("ships: ",this.ships);
    
  }

  fetchShips(): void {
    this.seaManagementService.getShips().subscribe(
      (data) => {
        this.ships = data;
      },
      (error) => {
        console.error('Error fetching ships:', error);
      }
    );
  }

  viewPolicies(ship: any): void {
    this.selectedShipName = ship.shipName; // Store the selected ship's name
    this.seaManagementService.getPoliciesForShip(ship._id).subscribe(
      (data) => {
        this.selectedShipPolicies = data; // Load policies for the selected ship
      },
      (error) => {
        console.error('Error fetching policies:', error);
      }
    );
  }
}
