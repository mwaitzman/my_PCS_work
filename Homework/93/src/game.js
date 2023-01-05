import crash_sound from './media/crash.ogg';
import crunch_sound from './media/crunch.ogg';
import snake_head_image from './images/snakehead.png';
import apple_image from './images/redapple.png';
import './game.css';
import Snake from './snake.js';
import Apple from './apple.js';

/// the game data
let g = {};

g.runtime_checks = true;
g.CELL_SIZE = 64;
Object.freeze(g.CELL_SIZE);


g.canvas = document.querySelector('#theCanvas');
function resizeCanvas() {
	g.canvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % g.CELL_SIZE);
	g.canvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % g.CELL_SIZE);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

g.ctx = g.canvas.getContext('2d');

g.snakeHead = new Image();
g.snakeHead.src = snake_head_image;

g.crashSound = new Audio(crash_sound);
g.crunchSound = new Audio(crunch_sound);
g.speed = 1000;
g.score = 0;



function gameLoop() {
	g.ctx.clearRect(
		0,
		0,
		g.canvas.width,
		g.canvas.height
	);
	g.snake.move();
	g.apple.draw();
	g.ctx.font = 'bold 32px Arial';
	g.ctx.fillStyle = '#5c0';
	g.ctx.fillText(
		`Score: ${g.score}`,
		g.canvas.width - 160,
		40
	);
	if (!g.gameOver) {
		setTimeout(gameLoop, g.speed);
	} else {
		g.crashSound.currentTime = 0;
		g.crashSound.play();
		g.ctx.font = 'bold 32px Arial';
		g.ctx.fillStyle = '#f00';
		g.ctx.fillText(
			`GAME OVER!!!`,
			(g.canvas.width / 2) - 80,
			(g.canvas.height / 2) - 16
		);
	}
}


g.gameOver = false;
g.snakeHead.onload = () => {
	g.snake = new Snake(g);
	setTimeout(gameLoop, g.speed);
};

g.appleImg = new Image();
g.appleImg.src = apple_image;

g.apple = new Apple(g);
g.appleImg.onload = () => {
	g.apple.draw();
};


document.addEventListener('keydown', e => {
	switch (e.key) {
		case 'w':
		case 'ArrowUp':
			g.direction = 0;
		break;

		case 'a':
		case 'ArrowLeft':
			g.direction = 1;
		break;

		case 's':
		case 'ArrowDown':
			g.direction = 2;
		break;

		case 'd':
		case 'ArrowRight':
			g.direction = 3;
		break;
	}
});