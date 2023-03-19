(function () {
	"use strict";

	const socketIo = io();

	socketIo.emit('foo', 'Hello from the client');

	const chat_pane = document.getElementById("chat_pane");
	const message_submission_button = document.getElementById("message_submission_button");
	const message_composition_area = document.getElementById("message_composition_area");

	socketIo.on("msg", msg => {
		const new_message_elem = document.createElement("li");
		new_message_elem.innerText = msg;
		chat_pane.appendChild(new_message_elem);
	});

	message_submission_button.addEventListener("click", () => {
		if (message_composition_area.value) {
			socketIo.emit("msg", message_composition_area.value);
			message_composition_area.value = "";
		}
	});

})();
