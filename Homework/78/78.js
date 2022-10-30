(function() {
"use strict";
$("#form").submit(function(event) {
	event.preventDefault();
	
	const filename = $("#filename").val();
	const $data = $("#data");

	if (filename === "") {
		$data.css("border-color", "blue").text("empty filename");
		return 1;
	}

	$("#data").text("loading file...");

	const req = fetch(filename)
	// this code is so bad, but it's per the directions, so...
	setTimeout(function() {
		req.then(response => {
			if (!response.ok) {
				return null;
			}
			return response.text();
		})
		.then(data => {
			if (data === null) {
				//: this allows arbitrary HTML injection but I don't think there's a problem with that here
				$data.html(`Failed to load file <code>${filename}</code>. Does the file exist? Try loading <code>cargo-auditable_.dep-v0.json</code>`).css("border-color", "red");
			} else {
			$data.text(data).css("border-color", "green");
			}
		});
	}, 1000);
  });
})();