import { Injectable } from '@angular/core';
import { AuthGateway } from './external/auth.gateway';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Token } from './models/token.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private authGateway: AuthGateway) {}


	getAuthorizationToken() {
		return localStorage.getItem('token');
	}

	setAuthorizationToken(token: Token) {
		return localStorage.setItem('token', token.token);
	}

	removeAuthorizationToken() {
		return localStorage.removeItem('token');
	}

	login(email, password): Observable<Token> {
		return this.authGateway.login(email, password)
			.pipe(
				map(result => {
					this.setAuthorizationToken(result);
					return new Token(result);
				})
			);
	}
}