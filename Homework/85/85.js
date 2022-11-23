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




	alert("Teacher, you might need to execute `localStorage.removeItem(\"MPH_profiles\")` to remove the entry from the previous homework before this program will work correctly. This alert is located on line 24 of file 85.js, if you want to remove it");




	//// BGM handling
		const $msi= $("#music_source_input");
		const $BGM = $("#BGM");
		//// fit the size of the input box to (roughly) its placeholder text's length
		$msi.attr("size", $msi.attr("placeholder").length);
		$msi.keyup(function(key) {
			if (key.which === 13) {
				log(`changing background music to ${$msi.val()}`);
				$BGM.attr("src", $msi.val());
				$BGM.parent()[0].load();
			}
		});



	let profiles = gaj("MPH_profiles");
	let cur_prof, parts;
	let z_index = 0;



	const place_parts = p => {
		for (const [k, v] of Object.entries(p)) {
			////// This check seemed to be necessary in the old code so just keeping it here commented out in case it would become necessary again
			// if (k != "") {
				$(`#${k}`).css(v);
				//// finds the maximum z-index so we know where to resume at. Might be better to store it in the object itself, and also to bring it as low as possible, but this shouldn't realistically be a problem as it is
					z_index = v.zIndex > z_index ? v.zIndex : z_index;
			// }
		}
	}



	if (profiles != null) {
		//// because the browser doesn't prettyprint unless standalone it seems
			log(`INFO: loaded profiles:\n=\t`);log(profiles);
		cur_prof = profiles.last_used_profile;
		//// yeah, I know it looks kinda ugly, but this allows future named profiles to not collide with metadata
		parts = profiles.profiles[cur_prof].parts;
		//// is there a good way to not do the (presumably somewhat expensive) interpolation if log is nop?
			log(`loading profile[${cur_prof}] with parts ${JSON.stringify(parts)}`);
		if (parts.length !== 0) {// parts have been previously placed in this profile
			log("parts found for profile. Placing parts...")
			place_parts(parts);
		} else {//// no parts were previously placed on this profile
			log(`INFO: profile ${cur_prof} is empty`);
		}
	} else {
		log("no profiles found! Creating default profile");
		profiles = {
			profiles: [{
				name: "Profile 1",
				parts: {}
			}],
			last_used_profile: 0,
			schema_version: 0
		};
		//// surely these will be optimized to the literals it is obvious they are...right?
			cur_prof = profiles.last_used_profile;
			parts = profiles.profiles[cur_prof].parts;
	}



		let $prof_sel = $("#profile_sel");
		let psbuf_$;
		//// fill profile selector's options with the loaded profiles
			for (let i = 0; i < profiles.profiles.length; i++) {
				psbuf_$ += `<option value="${i}"${cur_prof == i ? " selected" : ""}>${profiles.profiles[i].name}</option>`;
			}
			$prof_sel.html(psbuf_$ + "<option value =\"__create_new_profile\" style=\"background-color: #9432D2\";>Create a new profile</option>");


		$prof_sel.change(() => {
			const val = $("#profile_sel option:selected").val();
			if (val === "__create_new_profile") {
				log("User's creating a new profile");

				//// 1 vs 0 based so no +1
				cur_prof = profiles.profiles.length;

				profiles.profiles.push({
					name: `Profile ${cur_prof + 1}`,
					parts: parts
				});
				profiles.last_used_profile = cur_prof;

				psbuf_$ += `<option value="${cur_prof}" selected>${profiles.profiles[cur_prof].name}</option>`;
				$prof_sel.html(psbuf_$ + "<option value =\"__create_new_profile\" style=\"background-color: #9432D2\";>Create a new profile</option>");
				//// save the new profile to disk
					saj("MPH_profiles", profiles);
			} else {
				log(`INFO: User changed the current profile to #${val}. Removing the previous profile's parts and placing this profile's parts...`);
				//// clear the old positioning. Could be optimized further to not clear and then immediately afterwards re-set the elements moved in both the previous and the current profile
					$(".MPHP").each(function() {
						$(this).css({
							top: "",
							left: ""
						})
					});
				cur_prof = val;
				parts = profiles.profiles[cur_prof].parts;
				place_parts(parts);
			}
		})



	//// MPHP mouse handling
		let dragging = null;
		let mouse_offset;
		$(document).on('mousedown', '.MPHP', e => {
			log('mouse down', e);

			dragging = $(e.target);
			dragging.css("z-index", z_index++);
			mouse_offset = {
				y: e.offsetY,
				x: e.offsetX
			};

			e.preventDefault();
		}).mousemove(e => {
			if (dragging !== null) {
				dragging.css({ top: e.pageY - mouse_offset.y, left: e.pageX - mouse_offset.x });
			}
		}).mouseup(e => {
			log('mouse up', e);

			if (dragging !== null) {
				parts[e.target.id] = {
					top: e.pageY - mouse_offset.y,
					left: e.pageX - mouse_offset.x,
					zIndex: z_index
				};
				log("parts", parts);
				profiles.profiles[cur_prof].parts = parts;
				saj("MPH_profiles", profiles);
				log("gaj", gaj("MPH_profiles").profiles[cur_prof]);

				dragging = null;
			}
		});
})();