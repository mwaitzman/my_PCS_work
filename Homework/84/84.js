var debug = !!1;
var nop = function() {};
var log = debug ? console.log : nop;


function gaj(k) {
	const v = window.localStorage.getItem(k);
	return v ? JSON.parse(v) : null;
}
function saj(k, v) {
	window.localStorage.setItem(k, JSON.stringify(v));
}


(function() {
	"use strict";

	let zIndex = 0;
	let parts = gaj("MPH_parts");
	log("parts", parts);
	if (parts) {
		parts = new Map(Object.entries(parts));
		log(parts);
		for (const [k, v] of parts) {
			log(`K: ${k}\nV: ${JSON.stringify(v)}`);
			// not sure why this check is necessary, but it is...
			if (k != "") {
				$(`#${k}`).css(v);
				zIndex = v.zIndex > zIndex ? v.zIndex : zIndex;
			}
		}
	} else {
		parts = new Map();
		// z_index = 0;
	}

	let dragging = false;
    let offset;
    $(document).on('mousedown', '.MPHP', e => {
		log('mouse down', e);
		dragging = $(e.target);
		dragging.css("z-index", zIndex++);
		offset = { y: e.offsetY, x: e.offsetX, };
		e.preventDefault();
    }).mousemove(e => {
    	if (dragging) {
			dragging.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
      }
    }).mouseup(e => {
    	log('mouse up', e);
		parts.set(e.target.id, {
			top: e.pageY - offset.y,
			left: e.pageX - offset.x,
			zIndex
		});
		log("parts", parts);
		saj("MPH_parts", Object.fromEntries(parts.entries()));
		log("gaj", gaj("MPH_parts"));
    	dragging = false;
    });
})();