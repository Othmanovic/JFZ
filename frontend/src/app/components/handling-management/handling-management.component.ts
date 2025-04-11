import { Component } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';
import { SeaManagement } from '../../models/sea-management';

@Component({
  selector: 'app-handling-management',
  templateUrl: './handling-management.component.html',
  styleUrl: './handling-management.component.scss'
})
export class HandlingManagementComponent {
  seaManagementRecords: SeaManagement[] = [];
  searchTerm: string = '';
  selectedSeaManagement: SeaManagement | null = null;
  startWorkingDate: string = '';

  constructor(private seaManagementService: SeaManagementService) {}

  ngOnInit(): void {
    this.loadSeaManagementRecords();
  }

  loadSeaManagementRecords(): void {
    this.seaManagementService.fetchSeaManagement().subscribe(
      (response) => {
        this.seaManagementRecords = response;
      },
      (error) => {
        console.error('Error loading Sea Management records:', error);
      }
    );
  }

  filteredRecords(): SeaManagement[] {
    if (!this.searchTerm) {
      return this.seaManagementRecords;
    }
    return this.seaManagementRecords.filter((record) =>
      record.bayanNumber?.toString().includes(this.searchTerm)
    );
  }

  selectRecord(record: SeaManagement): void {
    this.selectedSeaManagement = record;
    this.startWorkingDate = record.startWorkingDate
      ? new Date(record.startWorkingDate).toISOString().split('T')[0]
      : '';
  }

  saveStartWorkingDate(): void {
    if (!this.selectedSeaManagement) return;

    const updatedRecord: SeaManagement = {
      ...this.selectedSeaManagement,
      startWorkingDate: new Date(this.startWorkingDate) // Convert string to Date
    };

    this.seaManagementService.updateSeaManagement(updatedRecord).subscribe(
      (response) => {
        alert('Start working date saved successfully!');
        this.selectedSeaManagement = null;
        this.loadSeaManagementRecords();
      },
      (error) => {
        console.error('Error saving start working date:', error);
        alert('Error saving start working date.');
      }
    );
  }
}
