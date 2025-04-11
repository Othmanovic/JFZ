// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const user = {
      username: this.username,
      password: this.password
    };

    console.log('User Obj', user); // This should now log the correct values

    this.authService.login(user).subscribe(
      (data) => {
        if (data && data.success) {
          localStorage.setItem('token', data.token);  // Save the token
          localStorage.setItem('user', JSON.stringify(data.user));  // Save the full user object
          this.redirectUser(data.user.role);  // Redirect based on user role
          console.log("Role: ", data.user.role);
        } else {
          alert('Invalid username or password');
        }
      },
      (error) => {
        console.error('Error during login:', error);
        alert('Error during login. Please try again.');
      }
    );

  }

  private redirectUser(role: string) {
    switch (role) {
      case 'sea_management':
        this.router.navigate(['/sea_management']);
        break;
      case 'handling_management':
        this.router.navigate(['/handling_management']);
        break;
      case 'reviewer':
        this.router.navigate(['/reviewer']);
        break;
      case 'finance':
        this.router.navigate(['/finance']);
        break;
      case 'hr':
        this.router.navigate(['/hr']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'e3dad': // Add the new role
        this.router.navigate(['/e3dad']);
        break;
      case 'bayan': // Add the new role
        this.router.navigate(['/bayan']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }

}
