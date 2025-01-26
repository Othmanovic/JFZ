import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {
  shipId: string = '';
  policies: any[] = []; // Updated to handle multiple policies

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.shipId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchPolicies();
  }

  fetchPolicies(): void {
    this.adminService.getShipPolicy(this.shipId).subscribe(
      (response) => {
        // Access the 'policies' key from the response
        this.policies = response.policies; 
        console.log("Policies: ", this.policies); // For debugging
      },
      (error) => {
        console.error('Error fetching policies:', error);
      }
    );
  }
  
}
