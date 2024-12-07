import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  homeRoute: string = '/login'; // Default route if no role is found

  ngOnInit(): void {
    this.determineHomeRoute();
  }

  // Determine the home route based on the user's role
  private determineHomeRoute() {
    const role = localStorage.getItem('role'); // Replace with your actual method of fetching the role
    switch (role) {
      case 'sea_management':
        this.homeRoute = '/sea_management';
        break;
      case 'handling_management':
        this.homeRoute = '/handling_management';
        break;
      case 'reviewer':
        this.homeRoute = '/reviewer';
        break;
      case 'finance':
        this.homeRoute = '/finance';
        break;
      case 'hr':
        this.homeRoute = '/hr';
        break;
      case 'admin':
        this.homeRoute = '/admin';
        break;
      default:
        this.homeRoute = '/login';
        break;
    }
  }
}
