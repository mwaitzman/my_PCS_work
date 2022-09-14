var app = app || {};
app.MessageBox = (function() {

	function show(msg) {
		const message_box = document.getElementById("message_box");

		message_box.style.display = "flex";
		message_box.childNodes[1].innerText = msg;
	}
	
	return {
		show: msg => show(msg)
	};
})();



(function() {
	/// window.app.MessageBox.show('This is a test of the emergency broadcast system');
	const MB = window.app.MessageBox;
	const text_input = document.getElementById("text_input");
	const input_button = document.getElementById("input_button");
	const message_box_button = document.getElementById("message_box_button");

	input_button.addEventListener("click", () => {
		MB.show(text_input.value);
	});

	message_box_button.addEventListener("click", () => {
		message_box.style.display = "none";
	});
})();