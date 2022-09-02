(function() {
	"use strict";
	let num = 0;
	const btn_hldr = document.getElementById("button_holder");
	let newest_btn = document.getElementById("original_button");
	const action = () => {
		newest_btn = document.createElement("button");
		newest_btn.innerText = ++num;
		btn_hldr.appendChild(newest_btn);
		newest_btn.addEventListener("click", action);
	};
	newest_btn.addEventListener("click", action);
})();