import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  
    return this.http.post(`${this.apiUrl}/add-policy/${shipId}`, policyData, { headers });
  }

  getShipPolicy(shipId: string): Observable<any> {
    const token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });
  
    return this.http.get(`${this.apiUrl}/policy-details/${shipId}`, { headers });
  }
  
}
