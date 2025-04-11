import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeaManagementService } from '../../../services/sea-management.service';
import { AdminService } from '../../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../../shared/popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent implements OnInit {
  shipId: string = ''; // ID of the ship associated with the Bill of Lading
  billOfLading: any = {
    billNumber: '',
    receiver: '',
    goodsDescription: '',
    containerNumber: '',
    weight: 0,
    containerSize: '',
    goodsSize: '',
    cooling: false,
    isShared: false,
    shipmentType: '',
    containerType: ''
  };

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Get the shipId from the route parameters
    this.route.params.subscribe(params => {
      this.shipId = params['id'];
    });
  }

  submitBillOfLading(): void {
    console.log("Submitting policy:", this.billOfLading, "Sea Management ID:", this.shipId);
  
    this.adminService.addPolicy(this.shipId, this.billOfLading).subscribe(
      response => {
        console.log('Policy added successfully:', response);
        this.openDialog('Success', 'The policy has been updated successfully!', 'success');
        this.router.navigate(['/admin']);
      },
      error => {
        console.error('Error adding policy:', error);
        this.openDialog('Error', 'Failed to update the policy. Please try again.', 'error');
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
