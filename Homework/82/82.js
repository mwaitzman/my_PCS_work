(function() {
	"use strict";
	const debug = !!1;
	const nop = () => {};
	const log = debug ? console.log : nop;
	const $sb = $("#search_box");
	let sbv, coords;
	const rms = function() {
		try {
		$("#map span, #map a, #map div:empty").remove();
		$("div.gm-style-cc")[1].remove();
		} catch (_) {}
	};


	$sb.keyup(e => {
        if (e.which === 13) {
			sbv = $sb.val();
			if (sbv == "") return;
			log("performing search");

			fetch(`http://api.geonames.org/wikipediaSearch?q=${sbv}&maxRows=1&username=nope&type=json`)
			.then(resp => resp.json())
			.then(data => {
				coords = [
					data.geonames[0].lat,
					data.geonames[0].lng
				];
				log(coords);
				const map = new google.maps.Map(
					document.getElementById("map"), {
						center: {
							lat: coords[0],
							lng: coords[1]
						},
						zoom: 12,
						disableDefaultUI: true
				  });
			});
			setTimeout(rms, 100);
			setTimeout(rms, 500);
			setTimeout(rms, 1000);
			setTimeout(rms, 2000);
			setTimeout(rms, 3000);
			setTimeout(rms, 5000);
			setTimeout(rms, 10000);
        }
    });
})();