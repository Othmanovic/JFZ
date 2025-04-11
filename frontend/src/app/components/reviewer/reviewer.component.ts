import { Component } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../shared/popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrl: './reviewer.component.scss',
})
export class ReviewerComponent {
  bills: any[] = []; // List of bills
  loading: boolean = true;

  constructor(private billService: BillService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBills();
  }

  // Fetch bills to be reviewed
  loadBills(): void {
    this.billService.getBillsForReview().subscribe(
      (data) => {
        this.bills = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading bills:', error);
        this.loading = false;
      }
    );
  }

  // Handle Accept
  acceptBill(billId: string): void {
    this.billService.updateBillStatus(billId, 'Accepted').subscribe(
      (response) => {
        this.openDialog(
          'Success',
          'The bill has been denied successfully!',
          'success'
        );
        this.loadBills(); // Refresh bills list
      },
      (error) => {
        this.openDialog(
          'Error',
          'Failed to deny the bill. Please try again.',
          'error'
        );
      }
    );
  }

  // Handle Deny
  denyBill(billId: string): void {
    this.billService.updateBillStatus(billId, 'Denied').subscribe(
      (response) => {
        this.openDialog(
          'Success',
          'The bill has been denied successfully!',
          'success'
        );
        this.loadBills(); // Refresh bills list
      },
      (error) => {
        this.openDialog(
          'Error',
          'Failed to deny the bill. Please try again.',
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

  selectedBill: any = null;

  openDetailsModal(bill: any) {
    this.selectedBill = bill;
  }
}
