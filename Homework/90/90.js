var debug = !!1;
var nop = function() {}
var log = debug ? console.log : nop;
var immut = function(target) {
	return Object.freeze(target);
};
// (function () {
	"use strict";

	const theCanvas = document.querySelector('#theCanvas');
	const ctx = theCanvas.getContext('2d');

	function resizeCanvas() {
	theCanvas.width = window.innerWidth;
	theCanvas.height = window.innerHeight;
	}
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();

	// class Ant {
	// static ANT_SIZE = 4;
	// immut(ANT_SIZE);

	// constructor() {
	// 	this.x = window.innerWidth / 2;
	// 	this.y = window.innerHeight / 2;
	// }

	// draw() {
	// 	context.fillRect(this.x, this.y, Ant.ANT_SIZE, Ant.ANT_SIZE * 2);
	// }

	// move() {
	// 	this.x += Ant.getRandomNumber(-1, 2);
	// 	this.y += Ant.getRandomNumber(-1, 1);

	// 	this.draw();
	// }

	// static getRandomNumber(min, max) {
	// 	return Math.floor(Math.random() * ((max - min) + 1)) + min;
	// }
	// }

	// const ants = [];
	// for(let i = 0; i < 1000; i++) {
	// 	ants.push(new Ant());
	// }
	// setInterval(
	// 	() => {
	// 		context.clearRect(0,0, window.innerWidth, window.innerHeight);
	// 		ants.forEach(ant => ant.move());
	// 	},
	// 	100
	// );


	let entities = new Map();
	/// collections of (indexes to) entities sorted by their X or their Y positions, respectively, to enable some easy optimizations when naively calculating collisions and whatnot
		let positions_y = [];
		let positions_x = [];

	// class Position {
	// 	static new(x, y) {
	// 		this.x = x;
	// 		this.y = y;
	// 	}
	// }

	class Ant {
		static default_size = 42;
		constructor(UUID, color, position, direction, size) {
			this.UUID = UUID;
			this.color = color;
			this.position = position;
			/// the direction the ant is currently facing, in radians
			this.direction = direction;
			this.size = size;
			this.max_speed = 3;
			///// actually, can I do something like `this {...rest} = arguments`??
		}
		// static default() {
		// 	...
		// }
		draw(ctx) {
///////////////////////////////////
			const prev_fillStyle = ctx.fillStyle;
			ctx.rotate(this.direction);
			ctx.fillStyle = this.color;
			ctx.fillRect(this.position.x, this.position.y, this.size / 4, this. size / 1.5);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.fillStyle = prev_fillStyle;
		}
		update() {
			let dist_to_travel = Math.random() * this.max_speed;
			this.direction = random_direction();
			let prospective_x = this.position.x + dist_to_travel * Math.sin(this.direction);
			let prospective_y = this.position.y + dist_to_travel * Math.cos(this.direction);

			/// don't collide with the other ants
				let m = {};
				let changed;
				/// runs until no new adjustments have been made to the prospective position
				do {
					A: for (let other of entities.values()) {
						if (other.UUID === this.UUID) {continue;}

						m.intersect_left = prospective_x - this.size <= other.x + other.size;
						m.intersect_right = prospective_x + this.size <= other.x - other.size;
						m.intersect_top = prospective_y - this.size <= other.y + other.size;
						
						if (m.intersect_left && m.intersect_top) {
							prospective_x = other.x + other.size + Number.MIN_VALUE;
							prospective_y = other.y + other.size + Number.MIN_VALUE;
							changed = true;
							break A;
						} else if (m.intersect_right && m.intersect_top) {
							prospective_x = other.x - other.size - Number.MIN_VALUE;
							prospective_y = other.y + other.size + Number.MIN_VALUE;
							changed = true;
							break A;
						} else {
							m.intersect_bot = prospective_y + this.size <= other.y - other.size;
							if (m.intersect_left && m.intersect_bot) {
								prospective_x = other.x + other.size + Number.MIN_VALUE;
								prospective_y = other.y - other.size - Number.MIN_VALUE;
								changed = true;
								break A;
							} else if (m.intersect_right && m.intersect_bot) {
								prospective_x = other.x - other.size - Number.MIN_VALUE;
								prospective_y = other.y - other.size - Number.MIN_VALUE;
								changed = true;
								break A;
							}
						}
						changed = false;
					}
				} while (changed);


					// m = [
					// 	/// left intersect
					// 	this.x - this.size <= other.x + other.size,
					// 	/// right intersect
					// 	this.x + this.size <= other.x - other.size,
					// 	/// top intersect
					// 	this.y - this.size <= other.y + other.size,
					// 	/// bottom intersect
					// 	this.y + this.size <= other.y - other.size

					// ];
					// if left_intersect 
				// });
				// if (
				// 	(this.x + this.size) >= (other.x - other.size)
				// 	|| (this.x - this.size) <= (other.x + other.size)
				// )
				///// t.x - t.s <= o.x + o.s ; t.x + t.s <= o.x - o.s ; 




			/// don't allow the ant to escape the canvas
				if (prospective_x + this.size  > theCanvas.width) {
					// I think this enables a bug where an ant can be squashed between the canvas wall and another object that's right next to it
					prospective_x = theCanvas.width;
				} else {
					prospective_x = Math.max(prospective_y, 0);
				}
				if (prospective_y + this.size > theCanvas.height) {
					this.position.y = theCanvas.height;
				} else {
					prospective_y = Math.max(prospective_y, 0);
				}

				this.position.x = prospective_x;
				this.position.y = prospective_y;
				// sort_XY();
		}
	}

	/// run the event loop a fixed 60 times per second
	setInterval(() => {
		for (let entity of entities.values()) {
			entity.update();
		}
		}, 16.6666666667
	);

	const render_entities = _ => {
		ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
		for (let entity of entities.values()) {
			//// really not the most robust, but that's JS... Would be real nice to have traits
			if (typeof entity.draw == "function") {
				entity.draw(ctx);
			}
		}
		requestAnimationFrame(render_entities);
	}
	requestAnimationFrame(render_entities);

	// document.getElementById("addAnts").addEventListener(
	// 	"click",
	// 	function() {
	// 		entities.push(Ant.new());
	// 	}
	// );
	const amountToAdd = document.querySelector('#amountToAdd');
	const colorInput = document.querySelector('#color');
    document.querySelector('#addAnts')
	.addEventListener(
		'submit',
		e => {
    		e.preventDefault();
			let ntt, UUID;
			let new_entities_UUIDs = new Array(amountToAdd.value);
			for (let i = 0; i < amountToAdd.value; i++) {
				UUID = new_UUID();
				ntt = new Ant(
					UUID,
					colorInput.value,
					random_pos(),
					random_direction(),
					Ant.default_size
				);
				id = entities.set(UUID, ntt) - 1;
				new_entities_UUIDs[i] = UUID;
			}
			positions_x = positions_x.concat(new_entities_UUIDs);
			positions_y = positions_y.concat(new_entities_UUIDs);
			sort_XY();
			log(positions_x, positions_y, entities);
    	}
	);
	function random_direction() {
		return Math.random() * 2 * Math.PI;
	}
	function random_pos() {
		const x = Math.random() * theCanvas.width;
		const y = Math.random() * theCanvas.height;
		return {x, y};
	}
	new_UUID = (function() {
		last_uuid = 0;
		return function() {
			return last_uuid++;
		}
	})();
	function sort_X() {
		positions_x.sort((a, b) => {
			const l = entities.get(a);
			const r = entities.get(b);
			return l.x < r.x ? -1 : l.x > r.x ? 1 : 0;
		});
	}
	function sort_Y() {
		positions_y.sort((a, b) => {
			const l = entities.get(a);
			const r = entities.get(b);
			return l.x < r.x ? -1 : l.x > r.x ? 1 : 0;
		});
	}
	function sort_XY() {
		sort_X();
		sort_Y();
	}
// }());