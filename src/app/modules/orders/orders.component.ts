import { Component, OnInit } from '@angular/core';
import { OrdersGateway } from '../../external/orders.gateway';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from "rxjs";
import { UsersGateway } from '../../external/users.gateway';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private routeSubscription: Subscription;

  public orders: any = [];


  constructor(private route: ActivatedRoute, 
    private ordersGateway: OrdersGateway,
    private usersGateway: UsersGateway) { }

  ngOnInit() {
  	this.subscribeRouteChange();
  }

  private loadOrders(userId?) {
  	this.ordersGateway.all(0, 15, userId).subscribe(orders => {
  		this.onData(orders);
  	});
  }

  private loadUserOrders(userId?) {
    this.usersGateway.orders(0, 15, userId).subscribe(orders => {
      this.onData(orders);
    });
  }

  private onData(orders) {
  	this.orders = orders;
  }

  private subscribeRouteChange() {
    let self = this;

    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['id'] === undefined) {
        self.loadOrders();
      }
      else {
        this.loadUserOrders(params['id']);
      }
    });
  }

}
