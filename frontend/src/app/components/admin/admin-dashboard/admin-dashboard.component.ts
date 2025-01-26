import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Price } from '../../../models/prices';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../../shared/popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  prices: Price[] = [];
  price: Price = {
    shipmentType: '',
    containerType: '',
    containerSize: 0,
    calculationMethod: 'amount', // Default to "amount"
    volume: 0,
    pricePerContainer: 0,
  };

  constructor(
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.fetchPrices();
  }

  handleCalculationMethodChange(method: string): void {
    if (method === 'amount' || method === 'volume') {
      this.price.calculationMethod = method;
    } else {
      console.error('Invalid calculation method:', method);
    }
    // Reset volume if switching back to "amount"
    if (method === 'amount') {
      this.price.volume = 0;
    }
  }

  fetchPrices(): void {
    this.adminService.getPrices('ship-id-placeholder').subscribe(
      (data) => {
        this.prices = data;
      },
      (error) => {
        console.error('Error fetching prices:', error);
      }
    );
  }

  savePrice(): void {
    // Validate price data
    if (!this.price.shipmentType || !this.price.containerType || !this.price.containerSize) {
      console.error('Please fill all required fields.');
      return;
    }
  
    if (this.price.calculationMethod === 'volume' && !this.price.volume) {
      console.error('Volume is required for calculation by volume.');
      return;
    }
    
    this.adminService.savePrice(this.price).subscribe(
      (response) => {
        console.log('Price saved successfully:', response);
        this.openDialog('Success', 'The price has been updated successfully!', 'success');
        this.router.navigate(['/admin']);
      },
      (error) => {
        this.openDialog('Error', 'Failed to update the price. Please try again.', 'error');
        console.error('Error saving price:', error);
      }
    );
  }
  
  
  

  editPrice(item: Price): void {
    this.price = { ...item }; // Populate the form with the selected item's data
  }

  deletePrice(id: string): void {
    this.adminService.deletePrice(id).subscribe(
      (response) => {
        console.log('Price deleted successfully:', response);
        this.fetchPrices(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting price:', error);
      }
    );
  }

  resetForm(): void {
    this.price = {
      shipmentType: '',
      containerType: '',
      containerSize: 0,
      pricePerContainer: 0,
      calculationMethod: 'amount',
      volume: 0,
    };
  }

  openDialog(title: string, message: string, type: 'success' | 'error'): void {
    this.dialog.open(PopupDialogComponent, {
      data: { title, message, type },
      width: '400px'
    });
  }
}
