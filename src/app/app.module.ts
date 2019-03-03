import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app.routing';
import {UsersModule} from './modules/users/users.module';
import {OrdersModule} from './modules/orders/orders.module';
import {ExternalModule} from './external/external.module';
import { AppComponent } from './app.component';
import {LayoutsModule} from './modules/common/layouts/layouts.module';
import { FormsModule } from '@angular/forms';
import {HttpErrorHandler} from './http-error-handler';
import { HttpClientModule } from '@angular/common/http'; 
import { httpInterceptorProviders } from './http-interceptors';
import {AuthModule} from './modules/auth/auth.module';
import {AuthorizationGuard} from './authorization.guard';
import {StatsModule} from './modules/stats/stats.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    UsersModule,
    OrdersModule,
    StatsModule,
    LayoutsModule,
    AuthModule,
    ExternalModule,    
  ],
  providers: [httpInterceptorProviders, HttpErrorHandler, AuthorizationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
