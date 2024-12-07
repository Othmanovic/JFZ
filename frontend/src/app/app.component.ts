import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isSeaManagement: boolean = false;

  constructor(private authService: AuthService) {}

  isSidebarVisible = true;

  ngOnInit() {    
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      // If logged in, fetch the user type and set the roles
      if (this.isLoggedIn) {
        const userType = this.authService.getUserType();
        this.isAdmin = userType === 'admin';
        this.isSeaManagement = userType === 'sea_management';
      }
    });

    // Subscribe to the sidebar visibility state
    this.authService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
    
  }
}
