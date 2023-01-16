export default class Item {
	constructor(name, price, quantity) {
		this.name = name;
		this.price = price;
		this.quantity = quantity;
	}
	static deserialize(json_obj) {
		// does webpack/react not allow `new this` or something??
		return new Item(
			json_obj.item,
			json_obj.total / json_obj.quantity,
			json_obj.quantity
		);
	}
}