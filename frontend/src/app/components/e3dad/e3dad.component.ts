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
  styleUrls: ['./e3dad.component.scss'],
})
export class E3dadComponent implements OnInit {
  ships: any[] = [];
  seaManagements: any[] = [];
  selectedShipPolicies: Policy[] = [];
  prices: Price[] = [];
  showPolicies: boolean = false;
  selectedShipName: string = ''; // Name of the selected ship
  searchTerm: string = ''; // Store user search input
  policySearchTerm: string = ''; // For searching policies by billNumber

  constructor(
    private seaManagementService: SeaManagementService,
    private adminService: AdminService,
    private dialog: MatDialog,
    private router: Router,
    private policyDataService: PolicyDataService
  ) {}

  ngOnInit(): void {
    this.fetchSeaManagement();
}


fetchSeaManagement(): void {
  this.seaManagementService.fetchSeaManagement().subscribe(
    (data) => {
      this.seaManagements = data;
    },
    (error) => {
      console.error('Error fetching sea management entries:', error);
    }
  );
}


  // 🔍 Filter Ships Based on Bayan Number
  filteredSeaManagements(): any[] {
    if (!this.searchTerm) {
      return this.seaManagements;
    }
    return this.seaManagements.filter((seaManagement) =>
      seaManagement.bayanNumber?.toString().includes(this.searchTerm.toLowerCase())
    );
}

  

  viewPolicies(seaManagement: any): void {
    console.log("Sea managemet id",seaManagement._id);
    
    this.selectedShipName = seaManagement.shipName;
    this.seaManagementService
      .getPoliciesForSeaManagement(seaManagement._id)
      .subscribe(
        (data) => {
          this.selectedShipPolicies = data;
        },
        (error) => {
          console.error('Error fetching policies:', error);
        }
      );
  }

  filteredPolicies(): Policy[] {
    if (!this.policySearchTerm) {
      return this.selectedShipPolicies;
    }
    return this.selectedShipPolicies.filter((policy) =>
      policy.billNumber
        .toLowerCase()
        .includes(this.policySearchTerm.toLowerCase())
    );
  }

  calculateBill(policy: Policy): void {
    const { serviceType, containerType, containerSize } = policy;

    this.adminService
      .getPrice(serviceType, containerSize, containerType)
      .subscribe(
        (price) => {
          if (price.calculationMethod === 'amount') {
            policy.bill = price.pricePerContainer;
          } else if (price.calculationMethod === 'volume') {
            policy.bill =
              price.pricePerContainer * parseFloat(policy.containerSize);
          } else if (price.calculationMethod === 'pouring') {
            policy.bill = price.pricePerContainer * policy.weight;
          }
          this.openDialog(
            'Success',
            'The bill has been calculated successfully!',
            'success'
          );
        },
        (error) => {
          console.error('Error fetching price:', error);
          this.openDialog(
            'Error',
            'Failed to calculate the bill. Please try again.',
            'error'
          );
        }
      );
  }

  openDialog(title: string, message: string, type: 'success' | 'error'): void {
    this.dialog.open(PopupDialogComponent, {
      data: { title, message, type },
      width: '400px',
    });
  }

  generateInvoiceForPolicy(policy: any): void {
    this.policyDataService.setPolicy(policy); // ✅ Store policy in the service
    this.router.navigate(['/bill'], { queryParams: { ...policy } }); // 🔄 Pass full policy
  }
}
