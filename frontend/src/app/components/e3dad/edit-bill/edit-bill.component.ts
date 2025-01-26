import { Component } from '@angular/core';
import { Bill } from '../../../models/bill';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../../../services/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrl: './edit-bill.component.scss'
})
export class EditBillComponent {
  bill: Bill = {
    _id: '',
    billNumber: '',
    receiver: '',
    goodsDescription: '',
    billAmount: 0,
    shipId: 0,
    status: 'Pending Review',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    const billId = this.route.snapshot.paramMap.get('id');
    if (billId) {
      this.billService.getBillById(billId).subscribe(
        (data) => {
          this.bill = data;
        },
        (error) => {
          console.error('Failed to fetch bill:', error);
        }
      );
    }
  }

  updateBill(): void {
    this.billService.updateBill(this.bill).subscribe(
      () => {
        alert('تم تحديث الفاتورة بنجاح.');
        this.router.navigate(['/e3dad']);
      },
      (error) => {
        console.error('Failed to update bill:', error);
        alert('فشل في تحديث الفاتورة. يرجى المحاولة مرة أخرى.');
      }
    );
  }
}
