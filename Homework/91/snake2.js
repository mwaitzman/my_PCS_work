var runtime_checks = true;
(function () {
	'use strict';

	const CELL_SIZE = 64;
	Object.freeze(CELL_SIZE);

	const canvas = document.querySelector('#theCanvas');
	function resizeCanvas() {
		canvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % CELL_SIZE);
		canvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % CELL_SIZE);
	}
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();

	const ctx = canvas.getContext('2d');

	//const snakeHead = document.querySelector('image');
	const snakeHead = new Image();
	snakeHead.src = "images/snakehead.png";
	/*setTimeout(() => {
		context.drawImage(snakeHead, 200, 200);
	}, 1000);*/

	const crashSound = document.querySelector('#crash');
	const crunchSound = document.querySelector('#crunch');

	let speed = 1000;
	let score = 0;

	class Snake {
		constructor() {
			this.segments = [{
				x: 0,
				y: 0
			}]
			this.direction = 3;
			this.draw();
		}

		draw() {
			/////BREAK(0)
			// let vtmp;
			// switch (this.direction) {
			// 	case 0:
			// 	break;

			// 	case 1:
			// 		vtmp = 270;
			// 	break

			// 	case 2:
			// 		vtmp = 180;
			// 	break

			// 	case 3:
			// 		vtmp = 90;
			// 	break
			// }
			// if (vtmp !== undefined) {
			// 	ctx.rotate(vtmp);
			// }
			ctx.drawImage(snakeHead, this.segments[0].x, this.segments[0].y);
			/////BREAK(0)
			// if (vtmp !== undefined) {
			// 	ctx.rotate(-vtmp);
			// }
			// vtmp = undefined;

			let
				sprite_size,
				/////BREAK(0)
				// rotate_angle,
				cur_body_part,
				prev_body_part
				/////BREAK(0)
				// xd,
				// yd
			;
			for (let i = 1; i < this.segments.length; i++) {
				cur_body_part = this.segments[i];
				prev_body_part = this.segments[i - 1];

				/////BROKEN(0): The context itself is what rotates, not the image, so this code doesn't work.
				/// rotate the body part so the top of it is facing directly toward the previous body part
					//irre: Why does JS have to be so bad? I can't do this (ignore the probably wrong angles - I just put them all in and I'd swap them around before actually using it, obviously). Ugh I miss my `match` expressions
						// switch ([
						// 	cur_body_part.x > prev_body_part.x ? 1 : cur_body_part.x < prev_body_part.x ? -1 : 0,
						// 	cur_body_part.y > prev_body_part.y ? 1 : cur_body_part.y < prev_body_part.y ? -1 : 0
						// ]) {
						// 	case [-1, -1]:
						// 		rotate_angle = 0;
						// 	break;

						// 	case [-1, 0]:
						// 		rotate_angle = 45;
						// 	break;

						// 	case [-1, 1]:
						// 		rotate_angle = 90;
						// 	break;

						/// case [0, 0] (and anything besides the 8 states we have here) is obviously impossible

						// 	case [0, -1]:
						// 		rotate_angle = 135;
						// 	break;

						// 	case [0, 1]:
						// 		rotate_angle = 180;
						// 	break;

						// 	case [1, -1]:
						// 		rotate_angle = 225;
						// 	break;

						// 	case [1, 0]:
						// 		rotate_angle = 270;
						// 	break;

						// 	case [1, 1]:
						// 		rotate_angle = 315;
						// 	break;
						// }
					// xd = cur_body_part.x > prev_body_part.x ? 1 : cur_body_part.x < prev_body_part.x ? -1 : 0;
					// yd = cur_body_part.y > prev_body_part.y ? 1 : cur_body_part.y < prev_body_part.y ? -1 : 0;
					// if        (xd === -1 && yd === -1) {
					// 	rotate_angle = 0;
					// } else if (xd === -1 && yd === 0) {
					// 	rotate_angle = 45;
					// } else if (xd === -1 && yd === 1) {
					// 	rotate_angle = 90;
					// } else if (xd === 0 && yd === -1) {
					// 	rotate_angle = 135;
					// } else if (xd === 0 && yd === 1) {
					// 	rotate_angle = 180;
					// } else if (xd === 1 && yd === -1) {
					// 	rotate_angle = 225;
					// } else if (xd === 1 && yd === 0) {
					// 	rotate_angle = 270;
					// } else if (xd === 1 && yd === 1) {
					// 	rotate_angle = 315;
					// } else if (runtime_checks) {
					// 	throw new Error(`Illegal values of xd and yd: are ${xd} and ${yd}`);
					// }

					// if (rotate_angle !== 0) {
					// 	ctx.rotate(rotate_angle);
					// };


				/// the snake's body segments' respective sizes decrease steadily, though capping at a quarter of the size of the head
				sprite_size = (CELL_SIZE * 0.25) + (CELL_SIZE * 0.75 * (1 / (i + 1)));
				ctx.drawImage(snakeHead,
					cur_body_part.x + (CELL_SIZE / 2) - (sprite_size / 2),
					cur_body_part.y + (CELL_SIZE / 2) - (sprite_size / 2),
					sprite_size,
					sprite_size
				);

				/////BREAK(0)
				// if (rotate_angle !== 0) {
				// 	ctx.rotate(-rotate_angle);
				// }
			}
		}

		move() {
			let x = this.segments[0].x;
			let y = this.segments[0].y;

			/// ensures that the head can't go onto the segment directly connected to it
			switch (direction) {
				/// up
					case 0:
						if (this.segments.length === 1
							|| this.segments[1].y + CELL_SIZE !== y
							) {
								y -= CELL_SIZE;
								this.direction = direction;
							} else {
								direction = this.direction;
							}
					break;

					/// left
					case 1:
						if (this.segments.length === 1
							|| this.segments[1].x + CELL_SIZE !== x
							) {
								x -= CELL_SIZE;
								this.direction = direction;
							} else {
								direction = this.direction;
							}
					break;

				/// down
				case 2:
					if (this.segments.length === 1
						|| this.segments[1].y - CELL_SIZE !== y
						) {
							y += CELL_SIZE;
							this.direction = direction;
						} else {
							direction = this.direction;
						}
					break;

				/// down
				case 3:
					if (this.segments.length === 1
						|| this.segments[1].x - CELL_SIZE !== x
						) {
							x += CELL_SIZE;
							this.direction = direction;
						} else {
							direction = this.direction;
						}
				break;
			}

			/// check for wall collision
				if (x < 0 || x > canvas.width - CELL_SIZE
					|| y < 0 || y > canvas.height - CELL_SIZE) {
					gameOver = true;
				}
			
			/// check for collision with own segments. Common sense dictates that it's impossible for there to be one if there are not at least 4 segments
				if (this.segments.length >= 4) {
					for (let i = 0; i < this.segments.length -1; i++) {
						if (
							x == this.segments[i].x
							&& y == this.segments[i].y
						) {
							gameOver = true;
						}
					}
				}

			if (!gameOver) {

				/// check for collision with apple
				if (this.segments[0].x === apple.x
					&& this.segments[0].y === apple.y) {
					score++;
					speed = speed - (speed * 0.10);
					crunchSound.currentTime = 0;
					crunchSound.play();
					apple.move();

					this.segments.unshift({x, y});
				} else {
					/// shifts the array's elements to the right once, and overwrites the 0th element with the newly computed `x` and `y`
						if (window.runtime_checks) {
							const old_segments = window.structuredClone(this.segments);
							Object.freeze(old_segments);

							this.segments.copyWithin(1, 0);
							this.segments[0] = {x, y};

							for (let i = 1; i < this.segments.length; i++) {
								if (
									this.segments[i].x !== old_segments[i-1].x
									|| this.segments[i].y !== old_segments[i-1].y
								) {
									throw new Error(`Runtime check failed: ${this.segments[i]} not equal to ${old_segments[i-1]}`);
								}
							}
						} else {
							this.segments.copyWithin(1, 0);
							this.segments[0] = {x, y};
						}
				}

			}

			this.draw();
		}
	}


	class Apple {
		constructor() {
			this.x = Apple.getRandomNumber(0, canvas.width - 1);
			this.y = Apple.getRandomNumber(0, canvas.height - 1);
			/// don't allow the apple to spawn on the snake's starting tile
			if (this.x === 0
			&& this.y === 0
			) {
				if (Math.random() < 0.5) {
					this.x++;
				} else {
					this.y++;
				}
			}
			this.draw();
		}

		draw() {
			ctx.drawImage(appleImg, this.x, this.y);
		}

		move() {
			APG: for(;;) {
				this.x = Apple.getRandomNumber(0, canvas.width - 1);
				this.y = Apple.getRandomNumber(0, canvas.height - 1);
				for (let segment of snake.segments) {
					if (segment.x === this.x
						&& segment.y === this.y
					) {
						continue;
					} else break APG;
				}
			}
			this.draw();
		}

		static getRandomNumber(min, max) {
			let r = Math.floor(Math.random() * ((max - min) + 1)) + min;
			return r - r % CELL_SIZE;
		}
	}


	function gameLoop() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		snake.move();
		apple.draw();
		ctx.font = 'bold 32px Arial';
		ctx.fillStyle = '#5c0';
		ctx.fillText(`Score: ${score}`, canvas.width - 160, 40);
		if (!gameOver) {
			setTimeout(gameLoop, speed);
		} else {
			crashSound.currentTime = 0;
			crashSound.play();
			ctx.font = 'bold 32px Arial';
			ctx.fillStyle = '#f00';
			ctx.fillText(`GAME OVER!!!`, (canvas.width / 2) - 80, (canvas.height / 2) - 16);
		}
	}

	let snake;
	let gameOver = false;
	snakeHead.onload = () => {
		snake = new Snake();
		// context.drawImage(snakeHead, 0, 0);
		setTimeout(gameLoop, speed);
	};

	const appleImg = new Image();
	appleImg.src = 'images/redapple.png';
	let apple = new Apple();
	appleImg.onload = () => {
		apple.draw();
	};

	let direction;
	document.addEventListener('keydown', e => {
		switch (e.key) {
			case 'w':
			case 'ArrowUp':
				direction = 0;
			break;

			case 'a':
			case 'ArrowLeft':
				direction = 1;
			break;

			case 's':
			case 'ArrowDown':
				direction = 2;
			break;

			case 'd':
			case 'ArrowRight':
				direction = 3;
			break;
		}
	});
}());