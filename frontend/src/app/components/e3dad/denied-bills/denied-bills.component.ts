import { Component } from '@angular/core';
import { PopupDialogComponent } from '../../../shared/popup-dialog/popup-dialog.component';
import { BillService } from '../../../services/bill.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denied-bills',
  templateUrl: './denied-bills.component.html',
  styleUrl: './denied-bills.component.scss'
})
export class DeniedBillsComponent {
  bills: any[] = [];
  displayedColumns: string[] = ['billNumber', 'receiver', 'goodsDescription', 'billAmount', 'actions'];

  constructor(
    private billService: BillService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchDeniedBills();
  }

  fetchDeniedBills(): void {
    this.billService.getDeniedBills().subscribe(
      (data) => {
        this.bills = data;
      },
      (error) => {
        console.error('Error fetching denied bills:', error);
        this.openDialog('Error', 'Failed to fetch denied bills. Please try again.', 'error');
      }
    );
  }

  editBill(bill: any): void {
    this.router.navigate(['/edit-bill', bill._id]);

  }

  deleteBill(bill: any): void {
    this.billService.deleteBill(bill._id).subscribe(
      () => {
        this.openDialog('Success', 'Bill deleted successfully.', 'success');
        this.fetchDeniedBills(); // Refresh the table
      },
      (error) => {
        console.error('Error deleting bill:', error);
        this.openDialog('Error', 'Failed to delete the bill. Please try again.', 'error');
      }
    );
  }

  openDialog(title: string, message: string, type: 'success' | 'error'): void {
    this.dialog.open(PopupDialogComponent, {
      data: { title, message, type },
      width: '400px'
    });
  }
}
