import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeaManagementService } from '../../../services/sea-management.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.scss'
})
export class PolicyListComponent implements OnInit {
  policies: any[] = [];
  shipId: string;

  constructor(private seaManagementService: SeaManagementService, private route: ActivatedRoute) {
    this.shipId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // this.fetchPolicies();
  }

  // fetchPolicies(): void {
  //   this.seaManagementService.getPoliciesForShip(this.shipId).subscribe(
  //     (data) => {
  //       this.policies = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching policies:', error);
  //     }
  //   );
  // }
}
