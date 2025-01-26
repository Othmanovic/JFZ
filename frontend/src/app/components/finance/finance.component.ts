import { Component } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})
export class FinanceComponent {
  bills: Bill[] = [];

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.fetchAcceptedBills();
  }

  fetchAcceptedBills(): void {
    this.billService.getAcceptedBills().subscribe(
      (data) => {
        this.bills = data;
      },
      (error) => {
        console.error('Error fetching accepted bills:', error);
      }
    );
  }
}
