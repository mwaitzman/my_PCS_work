"use strict";

function every(arr, callback) {
	for (let i = 0; i < arr.length; i++) {
		if (!callback(arr[i]))
		return false;
	}
	return true;
}


const letters = ['a', 'b', 'c'];

console.log(every(letters, (char) => char === char.toUpperCase()));


console.log(every(letters, (char) => char === char.toLowerCase()));



function some(arr, callback) {
	for (let i = 0; i < arr.length; i++) {
		if (callback(arr[i]))
		return true;
	}
	return false;
}

let input = ['a', 'B', 'c'];

console.log(some(input, (char) => char === char.toUpperCase()));

const lower = (char) => char === char.toLowerCase();
console.log(some(input, lower));
console.log(some(input, lower) === input.some(lower));
console.log(some(input, (char) => char === char.toUpperCase()) === input.some((char) => char === char.toUpperCase()));



function only_if(arr, predicate, action) {
	for (let i = 0; i < arr.length; i++) {
		if (predicate(arr[i]))
			action(arr[i]);
	}
}

const only_if_v2 = (arr, predicate, action) =>
	arr.filter(predicate)
	.forEach(action);



function multiply(x, y) {
	return x * y;
}

console.log(multiply(3, 4) === 12);

console.log(multiply(8, 2) === 16);


function get_multiplier() {
	return function(x, y) {
		return x * y;
	};
}

const mul = get_multiplier();

console.log(mul(5, 8) === 40);


function get_mul_by_x_fn(x) {
	return function(y) {
		return x * y;
	};
}

const triple = get_mul_by_x_fn(3);

console.log(triple(3) === 9);