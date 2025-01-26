import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = 'http://localhost:3000/api/bill'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  saveBill(bill: Bill): Observable<Bill> {

    let token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });
    console.log("Bill service");
    

    return this.http.post<Bill>(this.apiUrl, bill);
  }

  getBillsForReview(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/review`);
  }
  
  updateBillStatus(billId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${billId}/status`, { status });
  }

  getDeniedBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/denied`);
  }
  
  deleteBill(billId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${billId}`);
  }

  getBillById(id: string): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }
  
  updateBill(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.apiUrl}/${bill._id}`, bill);
  }

  getAcceptedBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/accepted`);
  }
  
  
  
}
