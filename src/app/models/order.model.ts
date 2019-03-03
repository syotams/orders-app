
export class Order {
	_id: string;
	user: any;
	address: string;
	status: string;
	products: any = [];
	created_at: Date

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}

	calcTotalPrice() {
	  let totalPrice = 0;
  
	  for(let i=0; i<this.products.length; i++) {
	  	totalPrice += parseInt(this.products[i].price);
	  }

	  return totalPrice;
	}

	static map(data) {
      const model = new Order();
      Object.assign(model, data);
      return model;
   }
}