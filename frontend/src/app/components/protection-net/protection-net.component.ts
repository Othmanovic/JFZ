import { Component, OnInit } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';

@Component({
  selector: 'app-protection-net',
  templateUrl: './protection-net.component.html',
  styleUrls: ['./protection-net.component.scss']
})
export class ProtectionNetComponent implements OnInit {
  ships: any[] = [];
  formData = {
    shipId: '',
    shipName: '',
    companyName: '',
    days: 1,
    netsUsed: 1,
    netRate: 0,
    delays: '',
    total: 0
  };

  constructor(private seaService: SeaManagementService) {}

  ngOnInit(): void {
    this.seaService.fetchSeaManagement().subscribe(data => {
      this.ships = data;
    });
  }

  onShipChange(): void {
    const selected = this.ships.find(s => s._id === this.formData.shipId);
    if (selected) {
      this.formData.shipName = selected.shipName;
    }
  }

  calculateTotal(): void {
    this.formData.total = this.formData.days * this.formData.netsUsed * this.formData.netRate;
  }

  submit(): void {
    this.seaService.saveProtectionNet(this.formData).subscribe({
      next: () => alert('تم حفظ البيانات بنجاح'),
      error: () => alert('حدث خطأ أثناء الحفظ')
    });
  }
}
