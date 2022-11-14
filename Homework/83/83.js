var debug = !1;
var nop = () => {};
var log = debug ? console.log : nop;

function gaj(k) {
	const tmp = window.sessionStorage.getItem(k)
	|| window.localStorage.getItem(k);
	return tmp ? JSON.parse(tmp) : null;
}
function saj(k, v) {
	window.localStorage.setItem(k, JSON.stringify(v));
}

(function() {
	"use strict";

	const $sb = $("#search_box");
	let sbv, coords, last_pos;

	last_pos = gaj("last_pos") || {lat: 42, lng: 42};
	navigator.geolocation.getCurrentPosition(
		pos => {
			log(pos.coords);
			last_pos = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			}
		},
		console.error,
		{
			maximumAge: Number.MAX_VALUE,
			timeout: 60000, // arbitrary, equals 1 minute
			enableHighAccuracy: false // takes wayyy too long to enable - by the time it loads, the user would long have entered a location, rendering this useless. Could fire a high accuracy one too though in the event the user is slow and hasn't caused the map to be modified yet and update accordingly if so
		}
	);
	
	const map = new google.maps.Map(
		document.getElementById("map"), {
			center: last_pos,
			zoom: 12,
			disableDefaultUI: true
	});
	// see less evil
		const rms = function() {
			try {
			$("img[alt=Google], a[href=\"https://www.google.com/intl/en-US_US/help/terms_maps.html\"]").remove();
			$("div.gm-style-cc")[1].remove();
			} catch (_) {}
		};
		setTimeout(rms, 10);
		setTimeout(rms, 50);
		setTimeout(rms, 100);
		setTimeout(rms, 500);
		setTimeout(rms, 1000);
		setTimeout(rms, 2000);
		setTimeout(rms, 3000);
		setTimeout(rms, 5000);
		setTimeout(rms, 10000);

	const drawingManager = new google.maps.drawing.DrawingManager({
		drawingMode: google.maps.drawing.OverlayType.MARKER,
		drawingControl: true,
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER,
		  	drawingModes: [
				google.maps.drawing.OverlayType.MARKER,
				google.maps.drawing.OverlayType.CIRCLE,
				google.maps.drawing.OverlayType.RECTANGLE,
				google.maps.drawing.OverlayType.POLYGON,
				google.maps.drawing.OverlayType.POLYLINE,
			],
		},
		circleOptions: {
			fillColor: "#832953",
			fillOpacity: 0.15,
			clickable: false,
			editable: true,
		},
	  });
	  drawingManager.setMap(map);


	  let drawings = gaj("drawings") || {version: 0, items: []};
	  log(drawings);
	  
	  switch (drawings.version) {
		case 0:
			drawings.items.forEach(d => {
				switch (d.type) {
					case "marker":
						new google.maps.Marker({
							position: {
								lat: d.lat,
								lng: d.lng
							},
							map
						});
					break;

					case "circle":
						new google.maps.Circle({
							center: {
								lat: d.lat,
								lng: d.lng
							},
							radius: d.radius,
							map
						});
					break;

					case "rectangle":
						new google.maps.Rectangle({
							bounds: {
								north: d.north,
								south: d.south,
								east: d.east,
								west: d.west

							},
							map
						});
					break;

					case "polygon":
						new google.maps.Polygon({
							path: d.path,
							map
						});
					break
					case "polyline":
						new google.maps.Polyline({
							path: d.path,
							map
						});
					break
				}
			  });
		break;
		default:
			console.error("unrecognized schema version:", drawings.version);
	  }


	  google.maps.event.addListener(drawingManager, 'overlaycomplete', d => {
		log(d);
		
		// Hoisting is great! What a wonderful language!
		let path = [];
		switch (d.type) {
			case "marker":
				drawings.items.push({
					type: "marker",
					lat: d.overlay.position.lat(),
					lng: d.overlay.position.lng()
				});
			break;

			case "circle":
				drawings.items.push({
					type: "circle",
					lat: d.overlay.center.lat(),
					lng: d.overlay.center.lng(),
					radius: d.overlay.radius
				});
			break;

			case "rectangle":
				const q = d.overlay.bounds;
				drawings.items.push({
					type: "rectangle",
					north: q.eb.hi,
					south: q.eb.lo,
					east: q.Ha.hi,
					west: q.Ha.lo
				});
			break;

			case "polygon":
				d.overlay.latLngs.cd[0].cd.forEach(e => {
					path.push({
						lat: e.lat(),
						lng: e.lng()
					});
				});
				log("path:", path);
				drawings.items.push({
					type: "polygon",
					path
				});
			break;

			case "polyline":
				d.overlay.latLngs.cd[0].cd.forEach(e => {
					path.push({
						lat: e.lat(),
						lng: e.lng()
					});
				});
				log("path:", path);
				drawings.items.push({
					type: "polyline",
					path
				});
			break;
		}

		saj('drawings', drawings);
	  });



	$sb.keyup(e => {
        if (e.which === 13) {
			sbv = $sb.val();
			if (sbv == "") return;
			log("performing search");

			fetch(`http://api.geonames.org/wikipediaSearch?q=${sbv}&maxRows=1&username=nope&type=json`)
			.then(resp => resp.json())
			.then(data => {
				coords = {
					lat: data.geonames[0].lat,
					lng: data.geonames[0].lng
				};
				log(coords);
				map.panTo(coords);
			});
        }
    });
})();