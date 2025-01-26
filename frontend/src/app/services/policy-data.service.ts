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
    return this.policyData;
  }

  clearPolicy(): void {
    this.policyData = null;
  }
}
