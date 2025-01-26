import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoliciesResponse, Policy } from '../models/policy';
import { Price } from '../models/prices';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admin'; // Adjust the URL to your API

  constructor(private http: HttpClient) { }


  addPolicy(shipId: string, policyData: any): Observable<any> {
    const token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });

    // Call the backend endpoint
    return this.http.post(`${this.apiUrl}/add-policy/${shipId}`, policyData, { headers });
  }


  getPolicyById(policyId: string): Observable<Policy> {    
    const token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });

    return this.http.get<Policy>(`${this.apiUrl}/policy/${policyId}`, { headers });
  }

  updatePolicy(policyId: string, policy: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/policies/${policyId}`, policy);
  }

  getShipPolicy(shipId: string): Observable<PoliciesResponse> {
    const token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });

    return this.http.get<PoliciesResponse>(`${this.apiUrl}/policy-details/${shipId}`, { headers });
  }

  getPrices(shipId: string): Observable<Price[]> {
    return this.http.get<Price[]>(`${this.apiUrl}/prices/${shipId}`);
  }

  getPrice(serviceType: string, containerSize: string, containerType: string): Observable<Price> {
    const params = { serviceType, containerSize, containerType };
  
    return this.http.get<Price>(`${this.apiUrl}/price`, { params });
  }
  

  savePrice(price: Price): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prices`, price);
  }

  deletePrice(id: string): Observable<any> {
    return this.http.delete<any>(`/api/prices/${id}`);
  }

}
