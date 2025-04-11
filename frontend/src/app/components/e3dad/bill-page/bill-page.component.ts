import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyDataService } from '../../../services/policy-data.service';
import { BillService } from '../../../services/bill.service';
import { Bill } from '../../../models/bill';
import { SeaManagementService } from '../../../services/sea-management.service';
import { SeaManagement } from '../../../models/sea-management';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrl: './bill-page.component.scss',
})
export class BillPageComponent {
  policy: any;
  seaManagementData: SeaManagement | null = null; // Store SeaManagement details
  today: Date = new Date();

  constructor(
    private policyDataService: PolicyDataService,
    private router: Router,
    private route: ActivatedRoute,
    private billService: BillService,
    private seaManagementService: SeaManagementService
  ) {}

  ngOnInit(): void {
    this.policy = this.policyDataService.getPolicy();
    
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length) {
        this.policy = params;
        console.log("Policy: ", this.policy);
        this.fetchSeaManagementData(this.policy.ship); // Fetch sea management details
        // console.log("ship id: ", this.policy.ship)
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  fetchSeaManagementData(shipId: string): void {
    this.seaManagementService.getSeaManagementByShipId(shipId).subscribe(
      (data) => {
        this.seaManagementData = data;
      },
      (error) => {
        console.error('Error fetching SeaManagement data:', error);
      }
    );
  }

  saveBill(): void {
    if (!this.policy.bill) {
      console.error('Bill is not calculated.');
      return;
    }

    console.log('Policy:', this.policy);
    console.log('Sea Management Data:', this.seaManagementData);

    const bill: Bill = {
      billNumber: this.policy.billNumber,
      receiver: this.policy.receiver,
      goodsDescription: this.policy.goodsDescription,
      containerNumber: this.policy.containerNumber,
      weight: this.policy.weight,
      containerSize: this.policy.containerSize,
      goodsSize: this.policy.goodsSize,
      cooling: this.policy.cooling,
      isShared: this.policy.isShared,
      shipmentType: this.policy.shipmentType,
      serviceType: this.policy.serviceType,
      containerType: this.policy.containerType,
      billAmount: this.policy.bill,
      shipId: this.policy.ship,

      // 🚢 Add Sea Management Data
      shipName: this.seaManagementData?.shipName || '',
      owner: this.seaManagementData?.owner || '',
      shippingPort: this.seaManagementData?.shippingPort || '',
      totalWeight: this.seaManagementData?.totalWeight || 0,
      netWeight: this.seaManagementData?.netWeight || 0,
      arrivalDate:
        this.seaManagementData?.arrivalDate || new Date().toISOString(),
      captainName: this.seaManagementData?.captainName || '',

      // 🆕 Add Bayan and Policy Information
      bayanNumber: this.seaManagementData?.bayanNumber,
      bayanYear: this.seaManagementData?.bayanYear || new Date().getFullYear(),
      // policyNumber: this.policy.policyNumber || '',

      status: 'Pending Review',
    };

    this.billService.saveBill(bill).subscribe({
      next: (savedBill) => {
        console.log('Bill saved successfully:', savedBill);
        alert('The bill has been saved.');
      },
      error: (err) => {
        console.error('Failed to save bill:', err);
        alert('Failed to save the bill. Please try again.');
      },
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
