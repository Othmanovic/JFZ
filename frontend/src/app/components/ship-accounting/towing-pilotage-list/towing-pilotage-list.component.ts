import { Component } from '@angular/core';

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

  filterVouchers() {
    this.submitted = true;

    // TODO: Replace with API call
    this.vouchers = [
      {
        number: '2025/117',
        shipName: 'LEPTIS STAR',
        serviceType: 'قطر',
        date: new Date(),
        agent: 'وكالة النيل',
        total: 3100.50
      }
    ];
  }
}
