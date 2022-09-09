(function() {
	"use strict";
	const debug = false;

	const table = document.getElementById("color_history_table");

	function change_colors() {

		let new_row = table.insertRow();
		let new_BG_color = Math.floor(Math.random() * 0xFFFFFF);
		let new_FG_color = Math.floor(Math.random() * 0xFFFFFF);
		if (debug) {
			console.log("------------------------\n");
			console.log(
				new_BG_color.toString(16).toUpperCase(), new_FG_color.toString(16).toUpperCase()
			);
		}
		// don't allow the colors to be so similar as to make the text extremely hard to see, but do it fairly. This is a naive and bad impl, but JS itself is bad, so...
			if (Math.abs(new_BG_color - new_FG_color) > 1000) {
				const determinant = Math.random() < 0.5;
				/// the value to adjust by
				const adjust_value = 0x7F7F7F7F;
				if (determinant < 0.5) {
					new_BG_color += determinant < 0.25
					? adjust_value
					: -adjust_value;
				}
				else {
					new_FG_color += determinant < 0.25
					? adjust_value
					: -adjust_value;
				}
				if (debug) {
					console.log(
						"ADJUSTED\n",
						new_BG_color.toString(16).toUpperCase(), new_FG_color.toString(16).toUpperCase()
					);
				}
			}
		// ensures the colors are in range (fixes the occasional negative color output) (think this could be moved into the contrast-assurance code but w/e)
			new_BG_color &= 0xFFFFFF;
			new_FG_color &= 0xFFFFFF;
	
		document.body.style.backgroundColor = "#" + new_BG_color;
		document.body.style.color = "#" + new_FG_color;
		
		new_row.insertCell().innerText = `#${new_BG_color.toString(16).toUpperCase()}, #${new_FG_color.toString(16).toUpperCase()}`;
		const now = new Date();
		new_row.insertCell().innerText = `${now.getHours()}:${ now.getMinutes() }:${ now.getSeconds().toString().padStart(2, "0") }.${ now.getMilliseconds().toString().padStart(3, "0") }`;
	}

	
	const toggle_button = document.getElementById("toggle_color_changing_button");
	let color_change = null;

	toggle_button.addEventListener("click", () => {
		if (!color_change) {
			
			const tbl_placeholder_txt_elem = document.getElementById("table_placeholder_text");
			if (tbl_placeholder_txt_elem) tbl_placeholder_txt_elem.parentNode.removeChild(tbl_placeholder_txt_elem);

			color_change = setInterval(change_colors, 140);
			toggle_button.innerText = "Stop changing colors";
		}
		else {
			clearInterval(color_change);
			color_change = null;
			toggle_button.innerText = "Start changing colors";
		}
	});
	table.addEventListener("click", (e) => {
		clearInterval(color_change);
		color_change = null;
		//BUGS: there appears to be a small area in at least the top right corner of the table cells where clicking throws `Uncaught TypeError: can't access property 0, e.target.parentNode.cells is undefined`. This shouldn't be too much of a problem, but it's still there
		const colors = e.target.parentNode.cells[0].innerText.split(", ");
		document.body.style.backgroundColor = colors[0];
		document.body.style.color = colors[1];
	});
})();