import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PolicyDataService {
  private policyData: any;

  setPolicy(policy: any): void {
    this.policyData = policy;
  }

  getPolicy(): any {
    console.log("Getting policy:", this.policyData); // Debugging
    return this.policyData;
  }

  clearPolicy(): void {
    this.policyData = null;
  }
}
