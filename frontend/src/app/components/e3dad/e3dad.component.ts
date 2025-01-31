import { Component, OnInit } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';
import { Policy } from '../../models/policy';
import { Price } from '../../models/prices';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../shared/popup-dialog/popup-dialog.component';
import { Router } from '@angular/router';
import { PolicyDataService } from '../../services/policy-data.service';

@Component({
  selector: 'app-e3dad',
  templateUrl: './e3dad.component.html',
  styleUrls: ['./e3dad.component.scss']
})
export class E3dadComponent implements OnInit {
  ships: any[] = [];
  selectedShipPolicies: Policy[] = [];
  prices: Price[] = [];
  showPolicies: boolean = false;
  selectedShipName: string = ''; // Name of the selected ship

  constructor(
    private seaManagementService: SeaManagementService,
    private adminService: AdminService,
    private dialog: MatDialog,
    private router: Router,
    private policyDataService: PolicyDataService
  ) { }

  ngOnInit(): void {
    this.fetchShips();
    // this.fetchPrices(); // Load prices once the component is initialized
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

  calculateBill(policy: Policy): void {
    const { shipmentType, containerType, containerSize } = policy;

    this.adminService.getPrice(shipmentType, containerSize, containerType).subscribe(
      (price) => {
        if (price.calculationMethod === 'amount') {
          policy.bill = price.pricePerContainer;
        } else if (price.calculationMethod === 'volume') {
          policy.bill = price.pricePerContainer * parseFloat(policy.containerSize);
        }
         else if (price.calculationMethod === 'pouring') {
          policy.bill = price.pricePerContainer * policy.weight;
        }
        this.openDialog('Success', 'The bill has been calculated successfully!', 'success');
      },
      (error) => {
        console.error('Error fetching price:', error);
        this.openDialog('Error', 'Failed to calculate the bill. Please try again.', 'error');
      }
    );
  }



  

  openDialog(title: string, message: string, type: 'success' | 'error'): void {
    this.dialog.open(PopupDialogComponent, {
      data: { title, message, type },
      width: '400px'
    });
  }

  generateInvoiceForPolicy(policy: any): void {
    this.router.navigate(['/bill'], { queryParams: policy });
  }



}
