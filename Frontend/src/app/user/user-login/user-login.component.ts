import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    this.authService.authUser(loginForm.value).subscribe(
      response => {
        console.log(response);
        const user = response;
        localStorage.setItem('token', user.token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('role', user.role);
        this.alertify.success('Login successful');
        this.router.navigate(['/'])
      });
      
    // if(token) {
    //   localStorage.setItem('token', token.email);
    //   this.alertify.success('Login successful');
    //   this.router.navigate(['/'])
    // } else {
    //   this.alertify.error('Login unsuccessful');
    // }
  }
}
