(function() {
"use strict";
	const date = new Date();
	const clock_elem = document.createElement("p");
	document.body.appendChild(clock_elem);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	clock_elem.innerText = `${hours}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
	setInterval(
		() => {
			if (seconds >= 59) {
				seconds = 0;
				if (minutes >= 59) {
					if (hours >= 23) {
						hours = 0;
					}else {hours++;}
				}else {minutes++;}
			}else {seconds++;}
			clock_elem.innerText = `${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
		}, 1000// = 1k MS
	);
})();