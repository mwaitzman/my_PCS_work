(function() {
"use strict";
$("#form").submit(function(event) {
	if ($("#form_enabled").prop("checked")) {
		alert(`You entered:\n\tNAME: ${$("#name").val()}\n\tADDRESS: ${$("#address").val()}`);
	} else {
		let block = $("<p>submission blocked due to form-submission-enabling checkbox being unchecked</p>");
			$("body").append(block);
			setTimeout(function() {
				block.remove();
			}, 2000);
	}
	event.preventDefault();
  });
})();