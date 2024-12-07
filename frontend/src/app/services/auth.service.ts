// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api';
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.checkInitialLoginState());
  public currentUserRole$ = new BehaviorSubject<string | null>(this.getInitialUserRole());
  private sidebarVisibilitySubject = new BehaviorSubject<boolean>(true);
  sidebarVisibility$ = this.sidebarVisibilitySubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Ensure the login state is consistent on refresh
    this.isLoggedIn$.next(this.checkInitialLoginState());
  }

  private checkInitialLoginState(): boolean {
    return !!localStorage.getItem('id_token'); // Assume logged in if token exists
  }

  private getInitialUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || null;
  }


  private getToken(): string {
    const token = localStorage.getItem('id_token');
    if (!token) throw new Error('Authorization token is missing.');
    return `Bearer ${token}`;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/auth/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/auth/login`, user).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          // Save the token and user information
          localStorage.setItem('id_token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user)); // Save user object for role access
          this.isLoggedIn$.next(true);
        }
      })
    );
  }
  

  isLoggedIn(): boolean {
    return !!localStorage.getItem('id_token');
  }

  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || null;
  }

  getRole(): string {
    const token = localStorage.getItem('id_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("Decoded Payload Role:", payload.data.role);
        return payload.data.role;
      } catch (error) {
        console.error("Token parsing error:", error);
        return '';
      }
    }
    return '';
  }

  logout(): void {
    // Clear local storage and update state
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }
  

  getUserType(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("User role in service:", user.role);
    return user.role || '';
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn$.value;
  }

  toggleSidebar() {
    const currentVisibility = this.sidebarVisibilitySubject.value;
    this.sidebarVisibilitySubject.next(!currentVisibility);
  }

  // Functions with inline Authorization Headers
  updateUserProfile(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.getToken(),
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.authUrl}/user/update`, userData, { headers });
  }

  getUserDetails(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': this.getToken(),
      'Content-Type': 'application/json'
    });
    return this.http.get<User>(`${this.authUrl}/user/details`, { headers });
  }

  // Add any other methods requiring authorization here, following the same pattern
}

