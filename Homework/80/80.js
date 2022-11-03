(function() {
	"use strict";
	let len = 0;
	let page = 0;
	let videos;
	let should_play = false;
	let tmpbuf = "";
	const $total = $("#total");
	const $loaded_vid = $("#loaded_vid");
	const $vid_list = $("#vid_list");


	fetch("videos/vidlist.json")
	.then(response => response.json())
	.then(response => {
		len = response.length;
		update_total();

		videos = response;
		update_displayed_list()
	});


	$("#next_btn").click(function() {
		if (Math.floor(len / 10) > page) {
			page++;
			update_total();
			update_displayed_list();
		}
	});


	$("#prev_btn").click(function() {
		if (page > 0) {
			page--;
			update_total();
			update_displayed_list();
		}
	});


	function update_total() {
		$total.text(`showing videos ${page * 10 + 1}-${Math.min(page * 10 + 10, len)} out of ${len}`);
	}


	$vid_list.click(e => {
		const idx = $(e.target).attr("data_vid_idx");
		// this primitive caching can prove its worth when the user spam clicks on the same list item. No harm, only potential gain here
		if (tmpbuf != idx) {
			$loaded_vid.attr("src", videos[idx].url);
			$("#vid_title").html(`<a href="${videos[idx].url}">${videos[idx].title}</a>`);
			$loaded_vid.attr("poster", videos[idx].thumbnail);
		}
	})


	$loaded_vid.click(() => {
		should_play = !should_play;
		if (should_play) {
			$loaded_vid[0].play();
		} else {
			$loaded_vid[0].pause();
		}
	});


	function update_displayed_list() {
		tmpbuf = "";
		for (let i = 0; i < 10; i++) {
			if (page * 10 + i < len) {
				let idx = page + i;
				// the whole `data_vid_idx` thing can probably be done in a much better way but this works and shouldn't be toooo bad
				tmpbuf += `<li class="vid_list_item" data_vid_idx="${idx}"><div class="tl" data_vid_idx="${idx}"><a href="${videos[idx].url}">${videos[idx].title}</a></div><div class="tl" data_vid_idx="${idx}"><img class="thumbnail" src="${videos[idx].thumbnail}" data_vid_idx="${idx}"></img></div></li>`;
			} else break;
		}
		if (tmpbuf != "") {
			$vid_list.html(tmpbuf);
		}
		tmpbuf = null;
	}
})();