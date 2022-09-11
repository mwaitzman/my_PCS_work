"use strict";

// SL - do these variables mean something to you? If yes, ok I guess, but meaningful names that other developers understand are very important. So fnMut (function mutate?) and tranny_arr??? not great choices I dont think
const map = (arr, fnMut) => {
	let tranny_arr = [];
	for (let idx = 0; idx < arr.length; idx++) {
		tranny_arr[idx] = fnMut(arr[idx]);
	}
	return tranny_arr;
};

const test_arr = [2, 4, 6];
const test_fnMut = item => item * 2;

const output_arr = map(test_arr, test_fnMut);

console.log(test_arr);
console.log(output_arr);