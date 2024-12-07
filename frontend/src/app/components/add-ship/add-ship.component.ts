import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeaManagementService } from '../../services/sea-management.service';

@Component({
  selector: 'app-add-ship',
  templateUrl: './add-ship.component.html',
  styleUrls: ['./add-ship.component.scss']
})
export class AddShipComponent {
  shipName: string = '';
  captainName: string = '';
  owner: string = '';
  flag: string = '';
  maxDive: number | null = null;
  shipNumber: string = '';

  constructor(private seaManagementService: SeaManagementService, private router: Router) { }

  addShip() {
    if (this.shipName && this.owner && this.flag && this.maxDive && this.shipNumber) {
      const newShip = {
        shipName: this.shipName,
        captainName: this.captainName,
        owner: this.owner,
        flag: this.flag,
        maxDive: this.maxDive,
        shipNumber: this.shipNumber
      };

      console.log("new ship", newShip);


      this.seaManagementService.addShip(newShip).subscribe(
        (response) => {
          if (response.success) {
            alert('Ship added successfully!');
            this.clearForm();
          } else {
            alert('Error adding ship');
          }
        },
        (error) => {
          console.error('Error adding ship:', error);
          alert('There was an error while adding the ship.');
        }
      );
    } else {
      alert('Please fill in all the required fields.');
    }
  }

  clearForm() {
    this.shipName = '';
    this.owner = '';
    this.captainName = '';
    this.flag = '';
    this.maxDive = null;
  }
}
