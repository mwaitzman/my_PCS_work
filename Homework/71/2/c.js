<<<<<<< HEAD
const Counter = app.Counter;
const CounterBuilder = app.CounterBuilder;


for (let i = 0; i < 10; i++) {
	Counter.inc();
}


const c1 = CounterBuilder.new_default();
const c2 = CounterBuilder.new_default();

for (let i = 0; i < 5; i++) {
	c1.inc();
}

for (let i = 0; i < 15; i++) {
	c2.inc();
}


console.log(`Counter's counter: ${Counter.get()}\nc1: ${c1.get()}\nc2:${c2.get()}\ncounters created with CounterBuilder: ${CounterBuilder.created()}`);
||||||| 2c39e58
=======
( function() {
	"use strict";

	const Counter = app.Counter;
	const CounterBuilder = app.CounterBuilder;


	for (let i = 0; i < 10; i++) {
		Counter.inc();
	}


	const c1 = CounterBuilder.new_default();
	const c2 = CounterBuilder.new_default();

	for (let i = 0; i < 5; i++) {
		c1.inc();
	}

	for (let i = 0; i < 15; i++) {
		c2.inc();
	}


	console.log(`Counter's counter: ${Counter.get()}\nc1: ${c1.get()}\nc2:${c2.get()}\ncounters created with CounterBuilder: ${CounterBuilder.created()}`);
})();
>>>>>>> a826897647a133ba5bec95988396fdb9b923516f

// SL - and again
// SL grade - 99.9 (-.1 for the unreolved merge)
