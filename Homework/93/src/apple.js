export default class Apple {
	constructor(game_data) {
		this.g = game_data;
		this.x = this.getRandomNumber(0, this.g.canvas.width - 1);
		this.y = this.getRandomNumber(0, this.g.canvas.height - 1);
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
		this.g.ctx.drawImage(
			this.g.appleImg,
			this.x,
			this.y
		);
	}

	move() {
		const g = this.g;
		APG: for(;;) {
			this.x = this.getRandomNumber(0, g.canvas.width - 1);
			this.y = this.getRandomNumber(0, g.canvas.height - 1);
			for (let segment of g.snake.segments) {
				if (segment.x === this.x
					&& segment.y === this.y
				) {
					continue;
				} else break APG;
			}
		}
		this.draw();
	}

	getRandomNumber(min, max) {
		let r = Math.floor(Math.random() * ((max - min) + 1)) + min;
		return r - r % this.g.CELL_SIZE;
	}
}