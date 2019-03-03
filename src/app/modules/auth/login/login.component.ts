import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from "@angular/router";
import {UserService} from '../../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email;
  public password;

  constructor(private authService: AuthService, 
              private userService: UserService,
              private router: Router) {}

  ngOnInit() {
  	if(this.authService.getAuthorizationToken()) {
		  this.loadMe();
  	}
  }

  login() {
  	this.authService.login(this.email, this.password).subscribe(
      result => {
    		if(result.token) {  	  		
  	  		this.loadMe();
	  	  }
      },
      error => {
        console.log(error);
      });
  }

  private loadMe() {
    this.userService.me().subscribe(user => {
      this.redirect();
    });
  }

  private redirect() {
  	this.router.navigate([`/orders`]);
  }

}
