"use strict";



// class Vehicle {
// 	constructor(color) {
// 		this.color = color;
// 	}
// 	go(speed) {
// 		this.speed = speed;
// 		console.log(`now going at speed ${this.speed}`);
// 		return this;
// 	}
// 	print() {
// 		console.log(`This ${this.color} vehicle is currently traveling at ${this.speed} miles per hour`);
// 		return this;
// 	}
// }


// class Plane {
// 	constructor(color) {
// 		Vehicle.call(this, color);
// 	}
// 	go(speed) {
// 		this.speed = speed;
// 		console.log(`now FLYING at speed ${this.speed}`);
// 		return this;
// 	}
// }
// 	Plane.prototype = Object.create(Vehicle.prototype);



// const vehicle0 = new Vehicle("red");
// vehicle0
// .go(60)
// .print();


// const plane0 = new Plane("blue");
// plane0
// .go(60)
// .print();

class Person {
	_first_name;
	_last_name;
	_age;
	constructor(first, last, age) {
		if (age < 0 || age > 120) {
			return null;
		}
		this.firstName = first;
		this.lastName = last;
		this.age = age;

	}
	set firstName(name) {
		if (!name) throw new Error("empty/null/undefined first name");
		this._first_name = name;
	}
	set lastName(name) {
		if (!name) throw new Error("empty/null/undefined last name");
		this._last_name = name;
	}
	set age(age) {
		if (!(0 <= age && age <= 120)) throw new Error("Invalid age (`!(0 <= age && age <= 120)` not met)");
		this._age = age;
	}
	toString() {
		let s = "";
		for (let prop in this) {
			if (
				this.hasOwnProperty(prop)
				&& typeof (this[prop]) !== 'function'
			) {
				s += `\n\t${prop}: ${this[prop]}`;
			}
		}
		return s;
	}
}

class Student extends Person {
	_grade;
	//// not working for some reason, so doing this other way
	// static grade_RE = /^[A-DF][+-]?$/i;
	constructor(first_name, last_name, age, grade) {
		super(first_name, last_name, age);
		this.grade = grade;
	}
	set grade(grade) {
		const grade_RE = Object.getPrototypeOf(this).grade_RE;
		if (grade_RE.test(grade)) {
			this._grade = grade;
		} else {
			throw new Error(`Invalid grade \`${grade}\`: failed to match regex \`${grade_RE}\``)
		}
	}
}
Person.prototype.grade_RE = /^[A-DF][+-]?$/i;


const p = new Person("Drew", "Devault", 0);
console.log(p.toString());

const s = new Student("Andrew", "Gallant", 0, "A+");
console.log(''+s);