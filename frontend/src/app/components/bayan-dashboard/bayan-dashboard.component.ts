// bayan-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';
import { Ship } from '../../models/ship';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../shared/popup-dialog/popup-dialog.component';
import { SeaManagement } from '../../models/sea-management';

@Component({
  selector: 'app-bayan-dashboard',
  templateUrl: './bayan-dashboard.component.html',
  styleUrls: ['./bayan-dashboard.component.scss']
})
export class BayanDashboardComponent implements OnInit {
  ships: Ship[] = [];
  seaManagementData: SeaManagement[] = [];

  searchTerm: string = '';

  constructor(
    private seaManagementService: SeaManagementService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchSeaManagement();
  }

  fetchSeaManagement(): void {
    this.seaManagementService.fetchSeaManagement().subscribe(
      (data) => {
        this.seaManagementData = data;
        console.log('Sea Management Data:', this.seaManagementData);
      },
      (error) => {
        console.error('Error fetching sea management data:', error);
      }
    );
  }

  searchShips(): Ship[] {
    if (!this.searchTerm) {
      return this.ships;
    }
    return this.ships.filter(ship =>
      ship.shipName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  assignBayan(seaManagement: SeaManagement): void {
    if (!seaManagement._id) {
      this.openDialog('Error', 'Sea Management ID is missing.', 'error');
      return;
    }
  
    this.seaManagementService.assignBayanNumber(seaManagement._id).subscribe(
      (updatedSeaManagement: SeaManagement) => {
        this.openDialog('Success', `تم تعيين رقم البيان: ${updatedSeaManagement.bayanNumber} للسفينة ${updatedSeaManagement.shipName}`, 'success');
        // Refresh the list
        this.fetchSeaManagement();
      },
      (error) => {
        console.error('Error assigning bayan number:', error);
        this.openDialog('Error', 'فشل في تعيين رقم البيان. حاول مرة أخرى.', 'error');
      }
    );
  }
  

  openDialog(title: string, message: string, type: 'success' | 'error'): void {
    this.dialog.open(PopupDialogComponent, {
      data: { title, message, type },
      width: '400px'
    });
  }
}
