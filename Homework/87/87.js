"use strict";



function Vehicle(color) {
	this.color = color;
}
	Vehicle.prototype.go = function(speed) {
		this.speed = speed;
		console.log(`now going at speed ${this.speed}`);
		return this;
	}
	Vehicle.prototype.print = function() {
		console.log(`This ${this.color} vehicle is currently traveling at ${this.speed} miles per hour`);
		return this;
	}


function Plane(color) {
	Vehicle.call(this, color);
}
	Plane.prototype = Object.create(Vehicle.prototype);
	Plane.prototype.go = function(speed) {
		this.speed = speed;
		console.log(`now FLYING at speed ${this.speed}`);
		return this;
	}



const vehicle0 = new Vehicle("red");
vehicle0
.go(60)
.print();


const plane0 = new Plane("blue");
plane0
.go(60)
.print();