import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Token } from '../models/token.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGateway {

  private readonly handleError: HandleError;
  

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handleError = this.httpErrorHandler.createHandleError('OrdersGateway');
  }

  login(email, password): Observable<Token> {
    return this.http.post<Token>(`http://localhost:3000/auth/login`, {email: email, password: password});
		//.pipe(catchError(this.handleError('login', {status: 'error'})));
  }

  register(user: User) {
  	// WE SET USERS AS ADMIN SO FIRST USER COULD REGISTER, REMMEBER THIS IS A DEMO 
  	user.role = 'admin';
  	
  	return this.http.post(`http://localhost:3000/auth/register`, user);
  }
}
