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
    serviceType: '',
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
    if (method === 'amount' || method === 'volume' || method === 'pouring') {
      this.price.calculationMethod = method;
    } else {
      console.error('Invalid calculation method:', method);
    }
    // Reset volume if switching back to "amount"
    if (method === 'amount') {
      this.price.volume = 0;
    }

    if (method === 'pouring') {
      this.price.containerSize = 0;
      this.price.weight = 0;
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
  
  // Function to calculate discount and update final price
  calculateDiscount(): void {
    if (this.price.applyDiscount && this.price.discountPercentage) {
      const originalPrice = this.price.pricePerContainer;
      
      // Apply discount formula
      const discountAmount = (this.price.discountPercentage / 100) * originalPrice;
      this.price.discountedPrice = originalPrice - discountAmount;
      console.log("discounted price: ",this.price.discountedPrice);
      
      
      // Update pricePerContainer with the discounted price
      this.price.pricePerContainer = this.price.discountedPrice;
    } else {
      // If no discount, keep the original price
      this.price.discountedPrice = this.price.pricePerContainer;
    }
  }
  
  

  savePrice(): void {
    // Validate required fields
    if (!this.price.serviceType || !this.price.containerType) {
      console.error('Please fill all required fields.');
      return;
    }
  
    if (this.price.calculationMethod === 'volume' && !this.price.volume) {
      console.error('Volume is required for calculation by volume.');
      return;
    }
    
    // Ensure discount is applied correctly
    // if (this.price.applyDiscount) {
    //   this.calculateDiscount(); // Calculate the discount before saving
    // }
  
    // Final object to be saved
    const finalPrice: Price = {
      ...this.price,
      pricePerContainer: this.price.discountedPrice || this.price.pricePerContainer, // Ensure final price is correct
    };
  
    this.adminService.savePrice(finalPrice).subscribe(
      (response) => {
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
      serviceType: '',
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
