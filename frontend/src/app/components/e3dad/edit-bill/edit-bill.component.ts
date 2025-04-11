import { Component } from '@angular/core';
import { Bill } from '../../../models/bill';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../../../services/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent {
  bill: Bill = {
    _id: '',
    billNumber: '',
    receiver: '',
    goodsDescription: '',
    containerNumber: '',
    weight: 0,
    containerSize: '',
    goodsSize: '',
    cooling: '',
    isShared: false,
    shipmentType: '',
    serviceType: '',
    containerType: '',
    billAmount: 0,
    shipId: '',
    status: 'Pending Review',
    
    // 🚢 New Fields from SeaManagement
    shipName: '',      
    owner: '',         
    shippingPort: '',  
    totalWeight: 0,    
    netWeight: 0,      
    arrivalDate: '',   
    captainName: ''    
  };

  statusOptions = ['Pending Review', 'Accepted', 'Denied'];

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
