"use strict";



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



function printStudents(jap_style, ...students) {
	const FN_RE = /_first_name:\s+(\w+)/;
	const LN_RE = /_last_name:\s+(\w+)/;
	const others_RE = /(?<!_first_name)(?<!_last_name):\s+(\S+)/g;
	let p;
	students.forEach(s => {
			p = `${jap_style ? s.toString().match(LN_RE)[1] : s.toString().match(FN_RE)[1]}, ${jap_style ? s.toString().match(FN_RE)[1] : s.toString().match(LN_RE)[1]}`;
			const others = s.toString().matchAll(others_RE);
			for (let match of others) {
				p += ", " + match[1];
			};
		console.log(p);
	});
}

const s = [
	new Student("Drew", "Devault", 29, "A+"),
	new Student("Andrew", "Gallant", 35, "A+")
];

printStudents(false, ...s);
printStudents(true, ...s);

let a = new Student("Andrew", "Gallant", 35, "A+");
console.log(a);
function rev_cpy(src, dest) {
	// doesn't work correctly (duplicating first or last name into both, but per the directions I'm not going to spend too much time on this and it's a PITA debugging this in firefox with the damn near impossible-to-make-out colors that for some reason aren't easily customizable (never mind why the hell they're colored that way in the first place...))
	return {
		_first_name: src._last_name,
		_last_name: src._first_name,
		...src
	} = src
}
console.log(`src: ${a}\ndest:${rev_cpy(a)}`);