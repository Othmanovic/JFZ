import { Component } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';

@Component({
  selector: 'app-protection-net-search',
  templateUrl: './protection-net-search.component.html',
  styleUrls: ['./protection-net-search.component.scss']
})
export class ProtectionNetSearchComponent {
  searchName: string = '';
  results: any[] = [];
  totalAmount: number = 0; // ✅ Declare this property

  constructor(private seaManagementService: SeaManagementService) {}

  search() {
    if (!this.searchName.trim()) {
      this.results = [];
      this.totalAmount = 0;
      return;
    }

    this.seaManagementService.getProtectionNetBillsByCompany(this.searchName).subscribe({
      next: (data) => {
        this.results = data;
        this.totalAmount = data.reduce((sum: number, bill: any) => sum + bill.total, 0); // ✅ Calculate total
      },
      error: () => {
        this.results = [];
        this.totalAmount = 0;
      }
    });
  }

  print() {
    const printContents = document.getElementById('printable-area')?.innerHTML;
    if (printContents) {
      const popupWindow = window.open('', '_blank', 'width=800,height=600');
      popupWindow?.document.open();
      popupWindow?.document.write(`
        <html dir="rtl" lang="ar">
          <head>
            <title>قسيمة شباك الحماية</title>
            <style>
              body { font-family: 'Cairo', sans-serif; direction: rtl; text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #000; padding: 8px; }
              .total { margin-top: 20px; font-size: 18px; font-weight: bold; }
            </style>
          </head>
          <body onload="window.print();">
            <h2>قسيمة شباك الحماية</h2>
            ${printContents}
          </body>
        </html>
      `);
      popupWindow?.document.close();
    }
  }
}
