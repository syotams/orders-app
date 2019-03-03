import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-product',
	templateUrl: 'product.component.html'
})
export class ProductComponent {
	@Input() product = {};

	@Input() shouldDisplayAddButton: boolean = false;

	@Output() productAdded = new EventEmitter<any>();


	add() {
		this.productAdded.emit(this.product);
		this.product = {};
	}
}