import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { UsersComponent } from './modules/users/users.component';
import {UserComponent} from './modules/users/user/user.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { OrderComponent } from './modules/orders/order/order.component';
import {BasicComponent} from './modules/common/layouts/basic.component';
import {BlankComponent} from './modules/common/layouts/blank.component';
import {PageNotFoundComponent} from './modules/common/layouts/not-found.component';
import { LoginComponent } from './modules/auth/login/login.component';
import {AuthorizationGuard} from './authorization.guard';
import { StatsComponent } from './modules/stats/stats.component';
import {RegisterComponent} from './modules/auth/register/register.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BasicComponent,
    children: [
      { path: '', component: OrdersComponent },
      { path: 'stats', component: StatsComponent, canActivate: [AuthorizationGuard] },
      { 
        path: 'users', 
        canActivate: [AuthorizationGuard],
        children: [
          { path: ':id/orders/:id', component: OrdersComponent },
          { path: ':id/orders', component: OrdersComponent },
          { path: 'create', component: UserComponent },
          { path: ':id', component: UserComponent },
          { path: '', component: UsersComponent }
        ]
      },
      { 
        path: 'orders', 
        canActivateChild: [AuthorizationGuard],
        children: [
          { path: 'create', component: OrderComponent },
          { path: ':id', component: OrderComponent },
          { path: '', component: OrdersComponent }
        ]
      }
    ]
  },

  {
    path: '', component: BlankComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: RegisterComponent}
    ]
  },

  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
