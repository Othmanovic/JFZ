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
  policy: any = null;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.shipId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchPolicyDetails();
  }

  fetchPolicyDetails(): void {
    this.adminService.getShipPolicy(this.shipId).subscribe(
      (data) => {
        this.policy = data.policy; // Assuming policy is stored under `policy` in the response
      },
      (error) => {
        console.error('Error fetching policy details:', error);
      }
    );
  }
}
