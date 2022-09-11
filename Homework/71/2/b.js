<<<<<<< HEAD
var app = app || {};

app.CounterBuilder = ( function() {
	let created = 0;

	const new_default = function() {
		created++;
		let count = 0;
		return {
			/// increment `count`. Returns the incremented count value as well for convenience
			inc: () => ++count,
			get: () => count
		};
	};

	return {
		new_default: new_default,
		created: () => created,
	};

})();
||||||| 2c39e58
=======
"use strict";
var app = app || {};

app.CounterBuilder = ( function() {
	let created = 0;

	const new_default = function() {
		created++;
		let count = 0;
		return {
			/// increment `count`. Returns the incremented count value as well for convenience
			inc: () => ++count,
			get: () => count
		};
	};

	return {
		new_default: new_default,
		created: () => created,
	};

})();
>>>>>>> a826897647a133ba5bec95988396fdb9b923516f

// SL - also has an unresolved merge - but looks good