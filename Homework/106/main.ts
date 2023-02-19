function mul(lhs: number, rhs:number) {
	return lhs * rhs;
}
function div(lhs: number, rhs: number) {
	return lhs / rhs;
}
let three: number = 3;
let five: number = 5;
console.assert(mul(three, five) == 15);
console.assert(div(mul(three, five), five) == three);


interface A {
	b: string,
	c: number
}
function f(d: A) {
	return d.b.concat(d.c.toString(16));
}

class Z {
	constructor(private x: number, public y: number) {
	}

	pos() {
		return [this.x, this.y];
	}
}