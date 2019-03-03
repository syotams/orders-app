import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {Params, ActivatedRoute} from "@angular/router";
import {OrdersGateway} from '../../../external/orders.gateway';
import {SearchGateway} from '../../../external/search.gateway';
import {UserService} from '../../../user.service';
import {Location} from "@angular/common";
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs'
import {FormBuilder, FormGroup} from '@angular/forms';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private routeSubscription: Subscription;

  // members for auto search
  private filteredUsers: any = [];
  private usersForm: FormGroup;
  private isSearchLoading: boolean = false;

  public order: Order = new Order;

  public errors: any;


  constructor(private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,              
              private searchGateway: SearchGateway,
              private ordersGateway: OrdersGateway,
              userService: UserService) {
    let user = userService.getLoggedInUser();

    if(!user.isAdmin()) {
      this.order.user = user;
    }
  }

  ngOnInit() {
  	this.subscribeRouteChange();
    this.initAutocomplete();    
  }

  private loadData(id: number) {
    this.ordersGateway.get(id).subscribe(order => {
    	this.order = order;
    });
  }

  ngOnDestroy(): void {
    // this unsubscriptions actually redundant because they are automatically unsubscribed when component is destroyed
    this.routeSubscription.unsubscribe();
  }

  private subscribeRouteChange() {
    let self = this;

    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['id'] !== undefined) {
        this.loadData(params['id']);
      }
    });
  }

  save() {
    if(!this.order.user) {
      this.order.user = this.usersForm.get('userInput').value._id;
    }

  	this.ordersGateway.save(this.order).subscribe(response => {
  	  if(response && response.status == 'error') {
        this.errors = response.errors;
      }
      else {
    		this.cancel();
      }
  	});
  }

  cancel() {
    this.location.back();
  }

  // TODO: MOVE AUTOCOMPLETE TO ITS OWN COMPONENT
  private initAutocomplete() {
    this.usersForm = this.fb.group({
      userInput: null
    });

    this.usersForm.get('userInput').valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isSearchLoading = true),
      switchMap(value => this.searchGateway.users(value)
      .pipe(finalize(() => this.isSearchLoading = false))
      )
    )
    .subscribe(users => this.filteredUsers = users);
  }

  displayFn(user) {
    if (user) { return user.first_name + ' ' + user.last_name; }
  }

  onProductAdded(product) {
    this.order.products.push(product);
  }
}
