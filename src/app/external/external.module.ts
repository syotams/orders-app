import { NgModule } from '@angular/core';
import { UsersGateway } from './users.gateway';
import { OrdersGateway } from './orders.gateway'
import { AuthGateway } from './auth.gateway';
import { SearchGateway } from './search.gateway';
import {StatsGateway} from './stats.gateway';

@NgModule({
  imports: [],
  declarations: [],
  providers: [UsersGateway, OrdersGateway, AuthGateway, SearchGateway, StatsGateway]
})
export class ExternalModule { }
