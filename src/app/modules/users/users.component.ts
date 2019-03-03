import { Component, OnInit } from '@angular/core';
import {UsersGateway} from '../../external/users.gateway';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any = [];

  constructor(private usersGateway: UsersGateway, private router: Router) { }


  ngOnInit() {
  	this.loadUsers();
  }

  private loadUsers() {
  	// HUSTON WE HAVE A MEMORY LEAK, PLEASE USE OBSERVABLE INSTEAD OR UNSUBSCRIBE
  	this.usersGateway.all(0, 15).subscribe(users => {
  		this.onData(users);
  	});
  }

  private onData(users) {
  	this.users = users;
  }

  archive(user) {

  }

  orders(id) {
    this.router.navigate([`/users/${id}/orders`]);
  }
}
