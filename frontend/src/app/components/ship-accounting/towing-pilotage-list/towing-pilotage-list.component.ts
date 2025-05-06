import { Component } from '@angular/core';
import { SeaManagementService } from '../../../services/sea-management.service'; // Make sure path is correct

@Component({
  selector: 'app-towing-pilotage-list',
  templateUrl: './towing-pilotage-list.component.html',
  styleUrls: ['./towing-pilotage-list.component.scss']
})
export class TowingPilotageListComponent {
  filter = {
    fromDate: '',
    toDate: ''
  };

  vouchers: any[] = [];
  submitted = false;

  constructor(private seaManagementService: SeaManagementService) {}

  filterVouchers() {
    if (!this.filter.fromDate || !this.filter.toDate) {
      alert('يرجى اختيار التاريخين');
      return;
    }

    this.submitted = true;

    this.seaManagementService.getVouchers(this.filter.fromDate, this.filter.toDate)
      .subscribe({
        next: (data) => {
          this.vouchers = data;
        },
        error: (err) => {
          console.error('Error fetching vouchers:', err);
          this.vouchers = [];
        }
      });
  }
}
