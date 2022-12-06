(function () {
	'use strict';

	const theCanvas = document.querySelector('#theCanvas');
	const ctx = theCanvas.getContext('2d');
	let balls = [];
	ctx.fillStyle = 'red';


	function add_new_ball(rad, clr) {
	balls.push(new Ball(rad, clr));
	}

	class Ball {
		constructor(radius, color) {
			this.radius = radius;
			this.color = color;
			this.x = 0;
			this.y = 0;
			this.dx = Math.random() * 2 * radius;
			this.dy = Math.random() * 2 * radius;
		}

		draw(ctx) {
			// No, I'm done with this retarded language. Give me my mutable references, my immutable references, my ACTUALLY immutable variables, my variable`.clone()`s, all the stuff a decent language should have so I can know precisely and have control over what EXACTLY can and is being modified
			// const {x, y, dx, dy, radius: r, color} = this;
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			this.x += this.dx;
			this.y += this.dy;
			ctx.fill();
		
			if (this.x < this.radius || this.x > window.innerWidth - this.radius) {
			this.dx = -this.dx;
			}
		
			if (this.y < this.radius || this.y > window.innerHeight - this.radius) {
			this.dy = -this.dy;
			}
		}
	}

	function draw_all() {
		if (balls.length !== 0) {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			balls.forEach(ball => ball.draw(ctx));
		}
	}

  setInterval(draw_all, 16.66);


  document.getElementById("add").addEventListener("click", function() {
	const rad = document.getElementById("rad").value;
	const radius = parseInt(rad);
	if (radius > 0) {
		const clr = document.getElementById("clr").value;
		switch (clr.length) {
			/// #RGB
			case 4:
				add_new_ball(radius, clr.replace(/^#(?<R>[0-9A-Fa-f])(?<G>[0-9A-Fa-f])(?<B>[0-9A-Fa-f]$)/, "#$<R>$<R>$<G>$<G>$<B>$<B>FF"));
			break;
			/// #RGBA
			case 5:
				add_new_ball(
					radius,
					clr.replace(
						/^#(?<R>[0-9A-Fa-f])(?<G>[0-9A-Fa-f])(?<B>[0-9A-Fa-f])(?<A>[0-9A-Fa-f])$/,
						"#$<R>$<R>$<G>$<G>$<B>$<B>$<A>$<A>"
					)
				);
			break;
			/// #RRGGBB
			case 7:
				add_new_ball(
					radius,
					clr.replace(
						/^#(?<R>[0-9A-Fa-f]{2})(?<G>[0-9A-Fa-f]{2})(?<B>[0-9A-Fa-f]{2})$/,
						"#$<R>$<G>$<B>FF"
					)
				);
			break;
			/// #RRGGBBAA
			case 9:
				add_new_ball(
					radius,
					clr.replace(
						/^#(?<R>[0-9A-Fa-f]{2})(?<G>[0-9A-Fa-f]{2})(?<B>[0-9A-Fa-f]{2})(?<A>[0-9A-Fa-f]{2})$/,
						"#$<R>$<G>$<B>$<A>"
					)
				);
			break;
			default:
			console.log(`invalid color ${clr}`);
			return;
		}
	}
  })

	const canvas = document.getElementById("theCanvas");
	canvas.style.height = window.innerHeight;
	canvas.style.width = window.innerWidth;
}());