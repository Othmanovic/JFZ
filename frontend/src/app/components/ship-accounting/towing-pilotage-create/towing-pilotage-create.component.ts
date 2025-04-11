import { Component, OnInit } from '@angular/core';
import { SeaManagementService } from '../../../services/sea-management.service';

@Component({
  selector: 'app-towing-pilotage-create',
  templateUrl: './towing-pilotage-create.component.html',
  styleUrls: ['./towing-pilotage-create.component.scss'],
})
export class TowingPilotageCreateComponent implements OnInit {
  ships: any[] = [];
  allFees: any[] = [];
  calculatedFees: any[] = [];
  total: number = 0;

  voucher = {
    shipId: '',
    shipName: '',
    wakeelName: '',
    bayanNumber: '',
    bayanYear: '',
    shipmentType: '',
    flag: '',
    netWeight: 0,
    stayDays: 1,
    date: ''
  };

  constructor(private SeaManagementService: SeaManagementService) {}

  ngOnInit(): void {
    this.fetchShips();
    this.fetchFees();
  }

  fetchShips() {
    this.SeaManagementService.fetchSeaManagement().subscribe(data => {
      this.ships = data;
    });
  }

  fetchFees() {
    this.SeaManagementService.getSeaFees().subscribe(data => {
      this.allFees = data;
      this.calculateFees();
    });
  }

  onShipChange() {
    const selectedShip = this.ships.find(ship => ship._id === this.voucher.shipId);
    if (selectedShip) {
      this.voucher.shipName = selectedShip.shipName;
      this.voucher.wakeelName = selectedShip.wakeelName || '';
      this.voucher.bayanNumber = selectedShip.bayanNumber || '';
      this.voucher.bayanYear = selectedShip.bayanYear || '';
      this.voucher.shipmentType = selectedShip.shipmentType || '';
      this.voucher.flag = selectedShip.flag || '';
      this.voucher.netWeight = selectedShip.netWeight || 0;
      this.voucher.stayDays = selectedShip.stayDays || 1;

      this.calculateFees();
    }
  }

  calculateFees() {
    this.calculatedFees = [];
    this.total = 0;

    for (let fee of this.allFees) {
      const rate = fee.rate;
      let amount = this.voucher.netWeight * rate; // Simplified for now

      this.calculatedFees.push({
        label: fee.label,
        rate: rate,
        amount: amount
      });

      this.total += amount;
    }
  }

  submitVoucher() {
    const payload = {
      ...this.voucher,
      calculatedFees: this.calculatedFees,
      total: this.total
    };
  
    this.SeaManagementService.saveVoucher(payload).subscribe({
      next: res => alert('تم حفظ القسيمة بنجاح'),
      error: err => alert('حدث خطأ أثناء الحفظ')
    });
  }
  

  print() {
    window.print();
  }
}
