import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyDataService } from '../../../services/policy-data.service';
import { BillService } from '../../../services/bill.service';
import { Bill } from '../../../models/bill';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrl: './bill-page.component.scss'
})
export class BillPageComponent {
  policy: any;
  today: Date = new Date();
  constructor(
    private policyDataService: PolicyDataService,
    private router: Router,
    private route: ActivatedRoute,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.policy = this.policyDataService.getPolicy();

    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length) {
        this.policy = params; // Use the policy data from query params
      } else {
        // Redirect back if no policy data
        this.router.navigate(['/']);
      }
    });
  }

  saveBill(): void {
    if (!this.policy.bill) {
      console.error('Bill is not calculated.');
      return;
    }
    console.log("policy", this.policy);
    

    const bill: Bill = {
      _id: this.policy._id,
      billNumber: this.policy.billNumber,
      receiver: this.policy.receiver,
      goodsDescription: this.policy.goodsDescription,
      billAmount: this.policy.bill,
      shipId: this.policy.ship,
      status: this.policy.status
    };

    this.billService.saveBill(bill).subscribe({
      next: (savedBill) => {
        console.log('Bill saved successfully:', savedBill);
        alert('The bill has been saved.');
      },
      error: (err) => {
        console.error('Failed to save bill:', err);
        alert('Failed to save the bill. Please try again.');
      }
    });
  }

  printPage(): void {
    const printContent = document.querySelector('.card');
    const originalContent = document.body.innerHTML;
  
    if (printContent) {
      document.body.innerHTML = printContent.outerHTML;
      window.print();
      document.body.innerHTML = originalContent;
    } else {
      console.error('Print content not found.');
    }
  }
  
}
