import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BlankComponent} from './blank.component';
import {BasicComponent} from './basic.component';
import {PageNotFoundComponent} from './not-found.component';
import {TopnavbarModule} from '../topnavbar/topnavbar.module';
import {FooterModule} from '../footer/footer.module';

@NgModule({
    declarations: [BlankComponent, BasicComponent, PageNotFoundComponent],
    imports     : [
        BrowserModule,
        RouterModule,
        TopnavbarModule,
        FooterModule
    ],
    exports     : [BlankComponent, BasicComponent, PageNotFoundComponent]
})

export class LayoutsModule {}
