<<<<<<< HEAD
var app = app || {};

app.Counter = ( function() {
	let count = 0;

	return {
		/// increment `count`. Returns the incremented count value as well for convenience
		inc: () => ++count,
		get: () => count
	};
})();
||||||| 2c39e58
=======
"use strict";
var app = app || {};

app.Counter = ( function() {
	let count = 0;

	return {
		/// increment `count`. Returns the incremented count value as well for convenience
		inc: () => ++count,
		get: () => count
	};
})();
>>>>>>> a826897647a133ba5bec95988396fdb9b923516f

// SL - code has an unresolved merge - but looks good
