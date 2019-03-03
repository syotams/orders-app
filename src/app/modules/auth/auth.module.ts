import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';

@NgModule({
  imports: [
  	FormsModule,
    BrowserModule,
    RouterModule,
    CommonModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
