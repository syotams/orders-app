export class User {
	first_name: string;
	last_name: string;
	email: string;
	role: string;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}

	get fullName() {
		return this.first_name + ' ' + this.last_name;
	}

	isAdmin() {
		return this.role == 'admin';
	}
}