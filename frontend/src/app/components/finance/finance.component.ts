import { Component, ElementRef, ViewChild } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})
export class FinanceComponent {
  bills: Bill[] = [];
  selectedBill: Bill | null = null;
  filteredBills: Bill[] = [];
  printBayanNumber: number | null = null;
  printBayanYear: number | null = null;

  @ViewChild('printSection') printSection!: ElementRef;

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

  openDetailsModal(bill: Bill): void { 
    this.selectedBill = bill;
  }

  closeDetailsModal(): void {
    this.selectedBill = null;
  }

  printBills(bayanNumber: number, bayanYear: number): void {
    this.filteredBills = this.bills.filter(
      (bill) => bill.bayanNumber === bayanNumber && bill.bayanYear === bayanYear
    );

    this.printBayanNumber = bayanNumber;
    this.printBayanYear = bayanYear;

    setTimeout(() => {
      const printContent = this.printSection.nativeElement.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }, 100);
  }
}
