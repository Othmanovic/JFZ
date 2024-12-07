import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeaManagementService } from '../../../services/sea-management.service';
import { AdminService } from '../../../services/admin.service';

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
    cooling: '',
    isShared: false,
    shipmentType: ''
  };

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the shipId from the route parameters
    this.route.params.subscribe(params => {
      this.shipId = params['id'];
    });
  }

  submitBillOfLading(): void {
    this.adminService.addPolicy(this.shipId, this.billOfLading).subscribe(
      response => {
        console.log('Policy added successfully:', response);
        this.router.navigate(['/admin']); // Redirect to the admin list page  
      },
      error => {
        console.error('Error adding policy:', error);
      }
    );
  }
}
