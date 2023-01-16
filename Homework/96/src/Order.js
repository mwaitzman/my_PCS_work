import Item from './Item.js';

export default class Order {
	constructor(customer_name, customer_address, items) {
		this.customer_name = customer_name;
		this.customer_address = customer_address;
		this.items = items;
	}
	get total() {
		return this.items.reduce(
			(total, e) => {
			return total + e.price * e.quantity;
			},
			0
		);
	}
	toString() {
		return `${this.customer_name}, ${this.customer_address}${this.items.reduce(
			(output, e) => {
			return `${output}
			\n\t${e.quantity}x ${e.name} @ \$${e.price} each (\$${e.quantity * e.price} total)`}, "")}
			\n\tall totalling \$${this.total}`;
	}
	static deserialize(json_obj) {
		return new Order(
			json_obj.customer,
			json_obj.address,
			json_obj.items.map(Item.deserialize)
		);
	}
}