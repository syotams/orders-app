import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Params, ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-component-header',
    templateUrl: 'component-header.template.html'
})
export class ComponentHeaderComponent {

	@Input() title;
	@Input() route;
	@Input() id;

}