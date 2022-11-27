// (function() {
	"use strict";



	class Vehicle {
		#speed = 0;
		#color;
		constructor(color) {
			this.#color = color;
		}
		go(speed) {
			this.#speed = speed;
			console.log(`now going at speed ${this.#speed}`);
			return this;
		}
		print() {
			console.log(`This ${this.#color} vehicle is currently traveling at ${this.#speed} miles per hour`);
			return this;
		}
	}


	class Plane extends Vehicle {
		#speed = 0;
		#color;
		constructor(color) {
			super(color);
		}
		go(speed) {
			this.#speed = speed;
			console.log(`now FLYING at speed ${this.#speed}`);
			return this;
		}
	}


	const vehicle0 = new Vehicle("red");
	vehicle0
	.go(60)
	.print();

	const plane0 = new Plane("red");
	plane0
	.go(60)
	.print();

// })();