import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../user.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-topnavbar',
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent implements OnInit {

	public user;
	

	constructor(private userService: UserService, private router: Router) {}

	ngOnInit() {
		this.userService.me().subscribe(user => {
			this.user = user;
		});
	}

	logout() {
		this.userService.logout();
		this.router.navigate(['/login']);
	}
}
