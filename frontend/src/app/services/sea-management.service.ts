import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShipArrival } from '../models/ship-arrivals';
import { Ship } from '../models/ship';

@Injectable({
  providedIn: 'root'
})
export class SeaManagementService {
  private apiUrl = 'http://localhost:3000/api/sea-management'; // Adjust the URL to your API

  constructor(private http: HttpClient) { }

  
  saveShipArrival(shipArrivalData: any): Observable<any> {
    let token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });

    console.log("Ship arrival: ", shipArrivalData);
    

    return this.http.post(this.apiUrl, shipArrivalData, { headers });
  }

  getShipArrivals(): Observable<ShipArrival[]> {
    let token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });

    return this.http.get<ShipArrival[]>(`${this.apiUrl}/ships`, { headers });
  }

  // Method to get details of a specific ship arrival by ID
  getShipArrivalById(id: string): Observable<any> {
    let token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });

    return this.http.get<ShipArrival>(`${this.apiUrl}/ship-arrival-details/${id}`, { headers });
  }

  addShip(ship: Ship): Observable<any> {
    let token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });

    return this.http.post(`${this.apiUrl}/add-ship`, ship, { headers });
  }

  // Fetch all ships
  getShips(): Observable<Ship[]> {
    let token = localStorage.getItem('id_token');
    if (token) {
      const headerDict = {
        'Authorization': `Bearer ${token.split(' ')[1]}`,  // Ensure 'Bearer' prefix in token
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      console.log("Ships in service", requestOptions);
      return this.http.get<Ship[]>(`${this.apiUrl}/ships`, requestOptions);
    } else {
      throw new Error('Token not found in local storage');
    }
  }

  generateShipNumber(shipId: string): Observable<any> {
    let token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.split(' ')[1]}`
    });

    return this.http.put(`${this.apiUrl}/ships/${shipId}/generate-number`, {}, { headers });
  }

  getPoliciesForShip(shipId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ships/${shipId}/policies`);
  }

  updateShip(ship: Ship): Observable<any> {
    const token = localStorage.getItem('id_token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.split(' ')[1]}`,
    });
  
    return this.http.put(`${this.apiUrl}/update-ship`, ship, { headers });
  }
  

}
