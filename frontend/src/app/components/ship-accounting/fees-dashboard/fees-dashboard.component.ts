import { Component, OnInit } from '@angular/core';
import { SeaManagementService } from '../../../services/sea-management.service';

@Component({
  selector: 'app-fees-dashboard',
  templateUrl: './fees-dashboard.component.html',
  styleUrls: ['./fees-dashboard.component.scss']
})
export class FeesDashboardComponent implements OnInit {
  newFee = { label: '', rate: 0 };
  seaFees: any[] = [];

  constructor(private seaManagementService: SeaManagementService) {}

  ngOnInit(): void {
    this.getFees();
  }

  getFees() {
    this.seaManagementService.getSeaFees().subscribe(data => {
      this.seaFees = data;
    });
  }

  addFee() {
    if (!this.newFee.label || !this.newFee.rate) return;

    this.seaManagementService.addSeaFee(this.newFee).subscribe(() => {
      this.newFee = { label: '', rate: 0 };
      this.getFees();
    });
  }

  deleteFee(id: string) {
    this.seaManagementService.deleteSeaFee(id).subscribe(() => {
      this.getFees();
    });
  }

  editFee(fee: any) {
    this.newFee = { ...fee };
    this.deleteFee(fee.id); // Optional: you could use an update instead
  }
}
