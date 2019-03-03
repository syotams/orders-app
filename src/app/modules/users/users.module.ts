import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ComponentsModule } from '../common/components/components.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
  	FormsModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    ComponentsModule,
    MatSelectModule
  ],
  declarations: [UsersComponent, UserComponent]
})
export class UsersModule { }
