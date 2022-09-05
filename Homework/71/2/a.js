var app = app || {};

app.Counter = ( function() {
	let count = 0;

	return {
		/// increment `count`. Returns the incremented count value as well for convenience
		inc: () => ++count,
		get: () => count
	};
})();