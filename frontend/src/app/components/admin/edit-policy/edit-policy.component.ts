import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { PopupDialogComponent } from '../../../shared/popup-dialog/popup-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrl: './edit-policy.component.scss'
})
export class EditPolicyComponent implements OnInit {
  policyId: string = ''; // ID of the policy to be edited
  policy: any = {
    billNumber: '',
    receiver: '',
    goodsDescription: '',
    containerNumber: '',
    weight: 0,
    containerSize: '',
    goodsSize: '',
    cooling: '',
    isShared: false,
    shipmentType: ''
  };

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Get policyId from the route parameters
    this.policyId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchPolicy();
  }

  // Fetch the policy details from the backend
  fetchPolicy(): void {
    this.adminService.getPolicyById(this.policyId).subscribe(
      (data) => {
        this.policy = data; // Prepopulate the form with fetched data
        console.log("Fetched policy data: ", this.policy);
      },
      (error) => {
        console.error('Error fetching policy:', error);
      }
    );
  }

  updatePolicy(): void {
    this.adminService.updatePolicy(this.policyId, this.policy).subscribe(
      (response) => {
        console.log('Policy updated successfully:', response);
        this.openDialog('Success', 'The policy has been updated successfully!', 'success');
        this.router.navigate(['/admin']); // Navigate back to admin page
      },
      (error) => {
        console.error('Error updating policy:', error);
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