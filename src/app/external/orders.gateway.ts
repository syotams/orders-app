import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersGateway {

  private readonly handleError: HandleError;
  

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handleError = this.httpErrorHandler.createHandleError('OrdersGateway');
  }

  all(page, pageSize, userId?): Observable<Order[]> {
	  return this.http.get<Order[]>(`http://localhost:3000/orders/?page=${page}&pageSize=${pageSize}`)
    .pipe(
      map((items: any[]) => items.map((item: any) => new Order(item)),
      catchError(this.handleError('all', {status: 'error'}))
    ));
  }

  get(id): Observable<Order> {
  	return this.http.get<Order>(`http://localhost:3000/orders/${id}`)
      .pipe(map(response => new Order(response)));
  }

  save(order): Observable<any> {
    if(order._id) {
      return this.update(order);
    }
    else {
      return this.create(order);
    }
  }

  private create(order) {
    return this.http.post(`http://localhost:3000/orders`, order)
      .pipe(catchError(this.handleError('create', {status: 'error'})));
  }

  private update(order) {
    return this.http.put(`http://localhost:3000/orders/${order._id}`, order)
      .pipe(catchError(this.handleError('update', {status: 'error'}))); 
  }
}
