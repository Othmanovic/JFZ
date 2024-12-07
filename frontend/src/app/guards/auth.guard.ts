import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

canActivate(): boolean {
  if (this.authService.isLoggedIn()) {
      return true;  // If user is logged in, allow route access
    } else {
      this.router.navigate(['/login']);  // If not logged in, redirect to login
      return false;  // Block access to the route
    }
  }

}
