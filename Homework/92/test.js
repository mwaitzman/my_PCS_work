(function() {
	"use strict";

	class Item {
		constructor(name, price, quantity) {
			this.name = name;
			this.price = price;
			this.quantity = quantity;
		}
    // SL - nice!
		static deserialize(json_obj) {
			return new this(
				json_obj.item,
				json_obj.total / json_obj.quantity,
				json_obj.quantity
			);
		}
	}

	class Order {
		constructor(customer_name, customer_address, items) {
			this.customer_name = customer_name;
			this.customer_address = customer_address;
			this.items = items;
		}
		get total() {
      // SL - nice!
			return this.items.reduce(
				(total, e) => {
				return total + e.price * e.quantity;
				},
				0
			);
		}
    // SL - nice! - but a little hard to read, maybe some new lines where possible (in the ${} sections)?
		toString() {
			return `${this.customer_name}, ${this.customer_address}${this.items.reduce((output, e) => {return output + `\n\t${e.quantity}x ${e.name} @ \$${e.price} each (\$${e.quantity * e.price} total)`}, "")}\n\tall totalling \$${this.total}`;
		}
		static deserialize(json_obj) {
			return new this(
				json_obj.customer,
				json_obj.address,
				json_obj.items.map(e => Item.deserialize(e))
			);
		}
	}

  // SL - dpy? Department of Physics? Maybe Im just not getting it but variable names should be obvious to the developer that comes after you and needs to maintain your code
	document.getElementById("load").addEventListener("click", function() {
		fetch("orders.json")
		.then(resp => resp.json())
		.then(orders_json => {
			let dpy_text = "";
			orders_json.forEach(e => {
				dpy_text += Order.deserialize(e) + '\n\n';
			});
			dpy_text = dpy_text.trimEnd();
			document.getElementById("dpy").innerText = dpy_text;
		})
	});
})();

// SL - nice!
// SL - grade 100