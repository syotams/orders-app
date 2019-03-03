import { Component, OnInit } from '@angular/core';
import { AuthGateway } from '../../../external/auth.gateway';
import {User} from '../../../models/user.model';
import { Router } from "@angular/router";

@Component({
	selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

	user: User = new User();
	errors: any = [];

	constructor(private authGateway: AuthGateway, private router: Router) {}

	ngOnInit() {}

	register() {
		this.authGateway.register(this.user).subscribe(success => {
			this.router.navigate(['/login']);
		},
		errors => {
			// TODO handle error
		});
	}

}