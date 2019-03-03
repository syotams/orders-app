import {NgModule} from '@angular/core';
import {ComponentHeaderComponent} from './component-header.component';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ComponentHeaderComponent],
    imports     : [BrowserModule, FormsModule, RouterModule],
    exports     : [ComponentHeaderComponent],
})

export class ComponentsModule {}
