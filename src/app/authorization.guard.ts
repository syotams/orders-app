import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {Injectable} from "@angular/core";
import { User } from './models/user.model';

@Injectable()
export class AuthorizationGuard implements CanActivate, CanActivateChild {

    private user;


    constructor(private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean
    {
        let module = route.routeConfig.path.toUpperCase();

        let user = this.userService.getLoggedInUser();

        if(user) {
            return user.isAdmin() || module == 'ORDERS';
        }

        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean
    {
        let path = state.url.toUpperCase();

        if(path.indexOf('?') > -1) {
            path = path.substr(0, path.indexOf('?'));
        }

        let parts = path.split('/');
        parts.shift();

        let module = parts[0];
        let action: string = null;

        if(parts.length === 2) {
            action = parts[1];

            if(/^\d+$/.test(action)) {
                action = 'VIEW';
            }
        }

        let user = this.userService.getLoggedInUser();

        if(!user) {
            return false;
        }

        // IN THIS SECTION WE SHOULD TEST IF USER IS AUTHORIZED AGAINST AUTHORIZATION OBJECT
        // IN THIS EXAMPLE WE JUST USER ROLE TO AUTHORIZE USER
        let isAuthorized = false;

        switch (action) {
            case 'CREATE':
                isAuthorized = user.isAdmin() || module == 'ORDERS';
                break;

            case 'EDIT':
                isAuthorized = user.isAdmin() || module == 'ORDERS';
                break;

            default:
                isAuthorized = user.isAdmin() || module == 'ORDERS';
        }

        if(isAuthorized) {
            return true;
        }

        console.log('You are not authorized to access ' + module);

        return false;
    }

}