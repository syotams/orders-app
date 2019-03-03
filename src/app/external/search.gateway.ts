import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchGateway {

  private readonly handleError: HandleError;
  

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handleError = this.httpErrorHandler.createHandleError('OrdersGateway');
  }

  users(q): Observable<any> {
	return this.http.get(`http://localhost:3000/search/?q=${q}`)
      .pipe(catchError(this.handleError('user', {status: 'error'})));
  }

}