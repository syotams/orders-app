import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {UsersGateway} from '../../../external/users.gateway';
import {Location} from "@angular/common";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription;

  public user: any = {};

  public errors: any = {};

  isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private usersGateway: UsersGateway) { }

  ngOnInit() {
  	this.subscribeRouteChange();
  }

  private loadData(id: number) {
    this.setIsLoading(true);

    this.usersGateway.get(id).subscribe(user => {
    	this.user = user;
    });
  }

  ngOnDestroy(): void {
    // these unsubscriptions actually redundant because they are automatically unsubscribed when component is destroyed
    this.routeSubscription.unsubscribe();
  }

  private subscribeRouteChange() {
    let self = this;

    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['id'] === undefined) {
        self.setIsLoading(false);
      }
      else {
      	this.loadData(params['id']);
      }
    });
  }

  private setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  save() {
  	this.usersGateway.save(this.user).subscribe(response => {
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
}
