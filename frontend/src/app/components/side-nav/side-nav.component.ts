import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;
  isLoggedIn = false;



  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.sidebarVisibility$.subscribe(isVisible => {
      this.isSidebarVisible = isVisible;
    });

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleSidebar() {
    this.authService.toggleSidebar();
  }


  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }


  selectDashboard() {
    this.isDashboardSelected = true;
  }

}
