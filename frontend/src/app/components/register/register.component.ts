import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username: String = '';
  password: String = '';
  role: String = '';


  constructor(private router: Router,
    private authService: AuthService,

  ) { }

  register(form: NgForm) {
    const user = {
      username: this.username,
      password: this.password,
      role: this.role,
    }
    console.log("User Obj", user);




    this.authService.register(user).subscribe(data => {
      console.log("User Obj inside", user);

      if (data['success']) {
        alert("You are now registered, and can login");
        this.router.navigate(['./login'])
      } else {
        console.log("Else");

      }
    }
    )
  }
}
