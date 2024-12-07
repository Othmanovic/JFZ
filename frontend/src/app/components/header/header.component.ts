import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  isAdmin: boolean = false;
  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;
  userRole: string | null = null;
  
  
  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
  
  
  selectDashboard() {
    this.isDashboardSelected = true;
  }


  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit() {
    
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    
    this.userRole = this.authService.getUserRole();
    this.isAdmin = this.userRole === 'admin';
    
    this.authService.sidebarVisibility$.subscribe(isVisible => {
      this.isSidebarVisible = isVisible;
    });
  }
  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.authService.toggleSidebar();
  }
  
  logout() {
    this.authService.logout();
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }


}
