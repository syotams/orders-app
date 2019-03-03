import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TopnavbarComponent} from './topnavbar.component';
import {AppRoutingModule} from '../../../app.routing';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [TopnavbarComponent],
    imports     : [BrowserModule, AppRoutingModule, FormsModule, RouterModule],
    exports     : [TopnavbarComponent],
})

export class TopnavbarModule {}
