import { Component } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';
import { Ship } from '../../models/ship';

@Component({
  selector: 'app-handling-management',
  templateUrl: './handling-management.component.html',
  styleUrl: './handling-management.component.scss'
})
export class HandlingManagementComponent {
  ships: Ship[] = [];
  searchTerm: string = '';
  selectedShip: Ship | null = null;
  startWorkingDate: string = '';

  constructor(private seaManagementService: SeaManagementService) {}

  ngOnInit(): void {
    this.loadShips();
  }

  loadShips(): void {
    this.seaManagementService.getShips().subscribe(
      (response) => {
        this.ships = response;
      },
      (error) => {
        console.error('Error loading ships:', error);
      }
    );
  }

  filteredShips(): Ship[] {
    if (!this.searchTerm) {
      return this.ships;
    }
    return this.ships.filter((ship) =>
      ship.bayanNumber?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectShip(ship: Ship): void {
    this.selectedShip = ship;
    this.startWorkingDate = ship.startWorkingDate
      ? new Date(ship.startWorkingDate).toISOString().split('T')[0]
      : '';
  }

  saveStartWorkingDate(): void {
    if (!this.selectedShip) return;
  
    const updatedShip: Ship = {
      ...this.selectedShip,
      startWorkingDate: new Date(this.startWorkingDate), // Convert string to Date
    };
  
    this.seaManagementService.updateShip(updatedShip).subscribe(
      (response) => {
        alert('Start working date saved successfully!');
        this.selectedShip = null;
        this.loadShips();
      },
      (error) => {
        console.error('Error saving start working date:', error);
        alert('Error saving start working date.');
      }
    );
  }
  
}
