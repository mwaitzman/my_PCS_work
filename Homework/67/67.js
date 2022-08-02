// jshint -W104, -W119

const dayOfWeek = (function() {
	"use strict";
	const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return {
		getDayName: idx => names[idx],
		getDayNumber: name => {
			for (let i = 0; i < names.length; i++) {
				if (names[i] === name) return i;
			}
		}
	};
})();

console.log(dayOfWeek.getDayName(1) === "Monday");
console.log(dayOfWeek.getDayNumber("Thursday") === 4);




// Using IEEE 754 floating point numbers for monetary calculations is awful
const InterestCalculator = ( function() {
	"use strict";
	let rate = 0.08;
	let years = 1;
	return {
		calculateInterest: principal => {
			return principal * (1 + rate) * years;
		},
		setRate: num => rate = num,
		setYears: num => years = num,
	};
})();

InterestCalculator.setRate(0.2);
InterestCalculator.setYears(5);
//NOTE: `==` is used instead of `===` to automagically convert to the same format
console.log(InterestCalculator.calculateInterest(100).toFixed(2) == 600);

InterestCalculator.setRate(0.1);
InterestCalculator.setYears(10);
console.log(InterestCalculator.calculateInterest(100).toFixed(2) == 1100);
console.log(InterestCalculator.calculateInterest(100).toFixed(2) == 1100.00);