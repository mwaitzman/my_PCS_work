export default class Snake {
	constructor(game_data) {
		this.g = game_data;
		this.segments = [{
			x: 0,
			y: 0
		}]
		this.direction = 3;
		this.draw();
	}

	draw() {
		const g = this.g;

		g.ctx.drawImage(g.snakeHead, this.segments[0].x, this.segments[0].y);


		let
			sprite_size,
			cur_body_part,
			prev_body_part
		;
		for (let i = 1; i < this.segments.length; i++) {
			cur_body_part = this.segments[i];
			prev_body_part = this.segments[i - 1];


			/// the snake's body segments' respective sizes decrease steadily, though capping at a quarter of the size of the head
			sprite_size = (g.CELL_SIZE * 0.25) + (g.CELL_SIZE * 0.75 * (1 / (i + 1)));
			g.ctx.drawImage(g.snakeHead,
				cur_body_part.x + (g.CELL_SIZE / 2) - (sprite_size / 2),
				cur_body_part.y + (g.CELL_SIZE / 2) - (sprite_size / 2),
				sprite_size,
				sprite_size
			);


		}
	}

	move() {
		const g = this.g;
		let x = this.segments[0].x;
		let y = this.segments[0].y;

		/// ensures that the head can't go onto the segment directly connected to it
		switch (g.direction) {
			/// up
				case 0:
					if (this.segments.length === 1
						|| this.segments[1].y + g.CELL_SIZE !== y
						) {
							y -= g.CELL_SIZE;
							this.direction = g.direction;
						} else {
							g.direction = this.direction;
						}
				break;

				/// left
				case 1:
					if (this.segments.length === 1
						|| this.segments[1].x + g.CELL_SIZE !== x
						) {
							x -= g.CELL_SIZE;
							this.direction = g.direction;
						} else {
							g.direction = this.direction;
						}
				break;

			/// down
			case 2:
				if (this.segments.length === 1
					|| this.segments[1].y - g.CELL_SIZE !== y
					) {
						y += g.CELL_SIZE;
						this.direction = g.direction;
					} else {
						g.direction = this.direction;
					}
				break;

			/// down
			case 3:
				if (this.segments.length === 1
					|| this.segments[1].x - g.CELL_SIZE !== x
					) {
						x += g.CELL_SIZE;
						this.direction = g.direction;
					} else {
						g.direction = this.direction;
					}
			break;
		}

		/// check for wall collision
			if (x < 0 || x > g.canvas.width - g.CELL_SIZE
				|| y < 0 || y > g.canvas.height - g.CELL_SIZE) {
				g.gameOver = true;
			}
		
		/// check for collision with own segments. Common sense dictates that it's impossible for there to be one if there are not at least 4 segments
			if (this.segments.length >= 4) {
				for (let i = 0; i < this.segments.length -1; i++) {
					if (
						x == this.segments[i].x
						&& y == this.segments[i].y
					) {
						g.gameOver = true;
					}
				}
			}

		if (!g.gameOver) {

			/// check for collision with apple
			if (this.segments[0].x === g.apple.x
				&& this.segments[0].y === g.apple.y) {
				g.score++;
				g.speed = g.speed - (g.speed * 0.10);
				g.crunchSound.currentTime = 0;
				g.crunchSound.play();
				g.apple.move();

				this.segments.unshift({x, y});
			} else {
				/// shifts the array's elements to the right once, and overwrites the 0th element with the newly computed `x` and `y`
					if (g.runtime_checks) {
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