import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Order } from '../models/order.model';
import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersGateway {

  private readonly handleError: HandleError;
  

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handleError = this.httpErrorHandler.createHandleError('UsersGateway');
  }

  all(page, pageSize): Observable<User[]> {
	return this.http.get(`http://localhost:3000/users/?page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((items: any[]) => items.map((item: any) => new User(item)),
        catchError(this.handleError('all', {status: 'error'}))
      ));
  }

  get(id): Observable<User> {
  	return this.http.get(`http://localhost:3000/users/${id}`)
      .pipe(map(response => new User(response)));
  }

  me(): Observable<User> {
    return this.get('me');
  }

  orders(page, pageSize, id): Observable<Order[]> {
    return this.http.get(`http://localhost:3000/users/${id}/orders/?page=${page}&pageSize=${pageSize}`)
      .pipe(
        map((data: any[]) => data.map((item: any) => new Order(item)),
        catchError(this.handleError('orders', {status: 'error'}))
      ));
  }

  save(user): Observable<any> {
    if(user._id) {
      return this.update(user);
    }
    else {
      return this.create(user);
    }
  }

  private create(user) {
    return this.http.post(`http://localhost:3000/users`, user)
      .pipe(catchError(this.handleError('create', {status: 'error'})));
  }

  private update(user) {
    return this.http.put(`http://localhost:3000/users/${user._id}`, user)
      .pipe(catchError(this.handleError('update', {status: 'error'}))); 
  }
}
