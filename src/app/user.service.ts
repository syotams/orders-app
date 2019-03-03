import { Injectable } from '@angular/core';
import { UsersGateway } from './external/users.gateway';
import { User } from './models/user.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private user: User;


  constructor(private usersGateway: UsersGateway, private authService: AuthService) {}

  me(): Observable<User> {  	
  	return this.usersGateway.me().pipe(
  		map(user => this.user = user)
	);
  }

  getLoggedInUser(): User {
  	return this.user;
  }

  logout() {
    this.authService.removeAuthorizationToken();
    this.user = null;
  }
}
