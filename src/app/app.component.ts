import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myShop';

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit() {
  	if(this.authService.getAuthorizationToken()) {
  		this.loadMe();
  	}
    else {
      this.router.navigate(['/login']);
    }
  }

  private loadMe() {
    this.userService.me().subscribe(user => {        
        this.redirect();
      }, 
      err => {
        // TODO: Handle err
      }
    );
  }

  private redirect() {
    this.router.navigate(['/']);
  }
}
