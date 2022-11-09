(function() {
	"use strict";
	const log_level = 1;
	let warns_should_be_errors = false;
	const info_warn = warning => warns_should_be_errors ? console.log(warning) : error(warning);
	const error = error => {
		$TO.append(`<span class="error">error</span>: ${error}\n`);
		$("body").css("background-color", "#9f0110");
		setInterval(() => $("body").css("background-color", "black"), 1000);
	};
	const info = message => $TO.append(`INFO: ${message}\n`);
	//desc: 0 = fixed string, 1 = glob pattern, 2 = regex (whatever flavor JS has...)
	//irre: JS sucks: no enums. Hate doing this
	// let search_mode = 0;
	let imgs = [];
	const $perform_search = $("#perform_search");
	const $search_box = $("#search_box");
	const $mode_select = $("#mode_select");
	const $match_area = $("#match_area");
	const $TO = $("#text_output");

	const get_img_list = () => {
		fetch("imglist.json")
		.then(response => response.json())
		.then(response => imgs = response);
	};


	get_img_list();


	setInterval(
		() => {
			get_img_list();
			// I don't think this works correctly because I think JS is actually UTF-16 for some reason, but it doesn't really matter. Who cares what random non-ASCII bytes these turn out to be?
			if (log_level !== 0) console.log(`LOG:\x1f${Date.now()}\x1fupdated images\x1d`);
		},
		15000//elab: == 15 seconds
	);


	function add_img(img) {
		//irre: best. language. EVER
		const url = /^https?:\/\//.test(img.url) ? img.url : `images/${img.url}`;
		console.log(img.title);
		$match_area.append(`<h4>${img.title}<img src="${img.url}"></img></h4>`);
	}


	$perform_search.click(x => {

		const search = $search_box.val();
		//desc: 0 = fixed string, 1 = glob pattern, 2 = regex (whatever flavor JS has...)
		const search_mode = $mode_select.prop("selectedIndex");

		//irre: I hate JS - why the BFNRH can't you let me make it const if I init later exactly once before using it??? Not that const is actually even immutable... what a lovely language
		let matcher;
		//cons: togglability of e.g. case sensitivity (for each mode)
		switch (search_mode) {
			case 1:
				matcher = {};
				//triv: whole init thing is kinda hacky but I can change it later if I wish
				///triv: perhaps I shouldn't be using a nested tab on each line and instead (for once) use spaces, but ehhh I think because of how it is here (all preceding line chars are identical, format is still easy to write a parser for), it's fine
				/// a[idx].t (stands for array.type) values:
				///		0 == literal string
				///		~~1 == empty string~~(REMOVED)
				///		2 == non-negated set
				/// 	3 == negated set
				/// 	4 == single wildcard
				/// 	5 == wildcard (any amount)
				/// 	6 == range (with values!)
				/// a[idx].v == a[idx].value
				matcher.a = [{t: 1}];
				//= arr
				let a = matcher.a;
				//// array length (for `a`), though really array index
				let al = 0;
				/// state values:
				/// 	0 == default
				/// 	1 == set
				let state = 0;
				//cons: ZSH-like brace (curly bracket) expansion? or is that irrelevant here? or would it be useful for matching any of multiple fixed substrings of arbitrary length, though should it have its own category if so, and would it not be better to just stick with regex at that point or would the performance improvements or syntax or clarity or w/e be worth it?
				// control characters in state 0
				const s0_ctrl_chars = "*?[";
				// control characters in state 1
				const s1_ctrl_chars = "!-]";//TODO: ?* too? check!

				//TODO: could probably have a tmp var instead and check that instead (and only push it to `a` upon end of input or type change), if that would actually yield a performance improvement
				const add_literal = c => {
					if (a[al].t === 0) {
						a[al].v += c;
					} else {
						a[++al] = {
							t: 0,
							v: c
						};
					}
				};
					
				for (let i = 0; i < search.length; i++) {
					//irre: JS sucks: why do I need parens here?? it's not ambiguous...
					//CONS: switch on state and then the search, rather than the other way around: I think it'd have better performance and look better too, but not sure. This works for now regardless, and enough progress has been made that I might as well finish this this way, and then refactor later if I deem it worth it
					//TODO: make c be a mutable var scoped here, and `switch` on that instead. Should have better performance and look better too
					switch (search[i]) {
						case '\\':
							if (search.length > i++) {
								const c = search[i];
								// a macro would be real nice here...
								switch (state) {
									case 0:
										if (s0_ctrl_chars.includes(c)) {
											add_literal(c);
										} else {
											add_literal('\\');
										}
									break;
									case 1:
										if (s1_ctrl_chars.includes(c)) {
											add_literal(c);
										} else {
											add_literal('\\');
										}
									break;
								}
							}
							else {
								add_literal('\\');
							}
						break;

						case '?':
							switch (state) {
								case 0:
									a[++al] = {t: 4};
								break;
								case 1:
									add_literal('?');
								break;
							}
						break

						case '*':
							switch (state) {
								case 0:
									//// strip consecutive AWs, as having more than is completely useless and just wastes resources
									if (a[al].t != 5) a[++al] = {t: 5};
								break;
								case 1:
									add_literal('*');
								break;
							}
						break

						case '[':
							if (search.length > i++) {
								const c = search[i];
								if (c === '!') {
									a[++al] = {
										t: 2,
										v: true // v is whether the set is negated/in*v*erted
									};
								} else {
									a[++al] = {
										t: 2,
										v: false
									};
									add_literal('!');
								}
								state = 1;
							}
							else {
								//cons: is this unexpected or is this nice QoL?
								info_warn("adding literal `[` due to it being at the end of the string. This behavior might be unexpected");
								add_literal('[');
							}
							//
						break;

						case '!':
							//rem: State 1 is already covered by the lookahead
							add_literal('!');
						break

						/// ALLOWED RANGES:
						/// 	digit `x` through digit `y` (e.g. `1-4`), where `x < y` where `0 < 1 < 2 ... < 9`
						/// 	some case letter through another letter of the same case (e.g. `h-l`), where the 1st letter is alphabetically prior to the 2nd
						/// 	as a special exception, `z-A` is allowed, being taken to mean `A-Za-z`. (not sure if this is a good idea though)
						case '-':
							switch (state) {
								case 0:
									add_literal('-');
								break;
								case 1:
									if (search.length > i++) {
										//// range's *b*eginning char
										const b = search[i-2];
										//// I think nominally *k*ey but really kind of arbitrary
										const k = a[al];
										if (k.t != 0) {
											error("parsing failed at range start: preceeding character not literal");
											return 1;
										}
										//// nominally *b*eginning('s) *c*ode*p*oint
										const bcp = [b.charCodeAt(0), b.charCodeAt(1)];
										if (!isNaN(bcp[1])) {
											error(`parsing failed at range start: no supported ranges for character "${b}"`);
											return 1;
										}
										//// range's *e*nding char
										const e = search[i];
										const ecp = [e.charCodeAt(0), e.charCodeAt(1)];
										if (!isNaN(ecp[1])) {
											error(`parsing failed at range end: no supported ranges for character "${e}"`);
											return 1;
										}

										//irre: wish consts were consts
										const zero_ = 48;//= '0'.charCodeAt();
										const nine_ = 57//= '9'.charCodeAt();
										const A_ = 65//= 'A'.charCodeAt();
										const Z_ = 90//= 'Z'.charCodeAt();
										const a_ = 97//= 'a'.charCodeAt();
										const z_ = 122//= 'z'.charCodeAt();
										
										if (isNaN(ecp[1])) {
											if (zero_ <= ecp[0] <= nine_) {

												if (zero_
												<= bcp[0]
												<= ecp[0]) {
													if (k.v.length !== 1) {
														//irre: I hate JS so much man. The workarounds done for this retarded (pretty much literally) language... I have no words
														a[al++].v = k.v.split(/.$/)[0];
													}
													a[al] = {
														t: 6,
														b,
														e
													};
												}
											}
										}
										else {
											error(`parsing failed in range end: no supported ranges use ${e}`)
										}
									} else {
										error("parsing failed in range: end of string");
										return 1;
									}
								break;
							}
							////TODO ????????? IDR what this TODO was for
						break;

						case ']':
							switch (state) {
								case 0:
									info_warn("unescaped `]` taken literally due to no opening `[` found beforehand.")
									add_literal(']');
								break;
								case 1:
									// closing the range
									state = 0;
									//CONS: deduping the chars in the set
								break;
							}								
						break;
						
						default:
							add_literal(search[i]);
					}
				}
				//CONS: instead reiterating over input starting from the idx of the final '[', with state as 0 this time to allow the user to not escape the final '[' if they don't close it! (might be unexpected behavior, and this is easier to implement and probably has better performance, so keeping it this way for now)
				if (state === 1) {
					error("Range not closed! Either insert a ']' where appropriate, or escape the final '['");
					return 1;
				}
				// delete the first element (the empty string matcher) from the array
					a.splice(0, 1);
				matcher.a = a;

				//// the matcher is very messy, broken, and undergoing a major refactor. The rest of the code works, but not this... 
				matcher.is_match = str => {
					if (log_level > 0) console.log(matcher.a);
				///		0 == literal string
				///		2 == non-negated set
				/// 	3 == negated set
				/// 	4 == single wildcard
				/// 	5 == wildcard (any amount)
				/// 	6 == range (with values!)
					//// nominally, *s*tate *c*ounter
					let sc = 0;
					/// chomped can be given back, swallowed has been permanently consumed
					/// INVARIANT: `swallowed <= chomped`
					let chomped, swallowed = 0;
					let cur_state = a[sc];
					// for (let i = 0; i < target_str.length; i++) {

					let idx = 0;

					
					//// initial quick and (relatively) inexpensive scan checking if the fixed strings are even present in the target string, and if the target string is even long enough to match the whole thing
					for (let e in a) {
						if (e.t <= 5//// kinda ugly way of bypassing `e.v` not existing for types 5 and 6. IDK, maybe it's actually kind of elegant in a manner even
						&& str.length < chomped + e.v.length) {
							return false;
						}
						switch (e.t) {
							case 0:
							a:	for (let i = 0; i < e.v.length; i++) {
									for (idx = 0; idx + chomped <= str.length; idx++) {
										if (str[chomped + idx++] == e.v[i]) {
											continue a;
										}
									}
								}
							chomped += e.v.length;
							// idx = 0; ?
							break;
							
							//check: is there a better way than this??
								case 2:
								case 3:
								case 4:
									swallowed++;
								break;
						}
					}



					
					//triv: I think the main step could actually be done in parallel, if doing the array-of-valids approach
					/////////////////////////////////////
					///	  0 == literal string         ///
					///	  2 == non-negated set        ///
					///   3 == negated set            ///
					///   4 == single wildcard        ///
					///   5 == wildcard (any amount)  ///
					///   6 == range (with values!)   ///
					/////////////////////////////////////
					// I wonder... could some sort of bastardized sorting/sifting algorithm help after this essential bucketing??

					// it'd probably still be worse than a dynamic push-around single-threaded version, but if lots of threads/cores are available and the data is particular, maybe this could be great? this deep CS stuff is fascinating regardless
/*
					just kinda need to merge it all together

					This work should be completely independent of each other, and extremely friendly to SIMD, with pretty much perfect cache locality, considering it's all contiguous. In fact, I bet a modern compiler would auto-vectorize the below code (well, perhaps you'd need to rewrite in a non-explicitly parallel for loop version, but still... trivial to do). The work could probably all
					For larger fixed sections, the actual comparison vs the target string could be a simple SIMD 512 bit (or whatever the highest the CPU supports is) subtract of the compiled pattern and the target string, with a result of 0 meaning success. Probably a dedicated instruction for this in some non-RISC sets...


					Actually... this could most likely be done on a GPU instead, benefitting from the far higher parallel crunching power of them.
					I think some dedicated
					For the actual comparison step vs the target string, I think sets and ranges could actually be optimized to basically constant time as opposed to linear with respect to the number of elements in the set, since you don't care where the zeroes come from,
					you do the arraygen for each of the constants in the set in one subtract-and-check-if-zero instruction or w/e obviously, then for the ranges (well, ranges that are just a straight bitwise range, like 0x41-0x5A being what it is for A-Z in UTF-8 and ASCII, and then the other typical ranges I know of being akin to that as well; this falls apart (literally - it "falls off" into another parallel unit) if ranges aren't like that, but they should be) it's slightly more complex and presumably slightly more expensive cycle-wise considering you need check for it being within a range rather than equal to zero

					I wonder if a sort of frequency table could be useful, especially if you already iterate over the whole thing, for the length checking (since that enables you to filter out string that aren't long enough, and to do just a single malloc call). If you put into a key value collection and then just sort however afterwards? or would this only really be useful for a jumpy and non-massively parallel version which is trying to skip work, whereas this just kinda does ALL the work, but in parallel so execution is faster even if usage of other resources like memory and electricity is much higher
					That'd also kinda be a bottleneck for

					Can the redundancy of identical bytes near enough each other that shader execution overlaps each other's work be exploited somehow? I'm not sure exactly how many bits GPUs operate over at one time, but it might not matter if the length/time of the instructions themselves is so low that any smart stuff like this would actually just make the program slower


					If UTF-16 text has 1 identical byte for ASCII text (I'm unsure of the encoding, knowing UTF-8 much much better), could that identicalness be taken advantage of here? Actually might even be worth converting UTF-16 test consisting primarily of ASCII to UTF-8 for this, although now that I think about it this might not really work that well with multi-byte comparisons (or it might be a completely trivial adaptation, with none at all for fixed text strings, since it ends up being the same, but possibly for ranges some work would need to be done? IDK, I'm not really thinking about this that much)

					Of course, all this is dependent on the data actually being large enough that all this is to be worth it, which in practice it very well might not be, considering the initialization overhead for the parallelism and whatnot, 
*/
					/* some Rust-like pseudo-code from last night I had written for some of the original idea I had written to try to work through this:
					```
						//////// max beginnings and endings array
						let MBAEA = ...;
						//// array of valids
						let mut AOV = vec![[0]; a.length];
						AOV.par_iter_mut()
						.zip_mut(a)
						.map(|(arr, e)| {
							(vec![0; e], e)
						});
						//// target' string
						let ts = ...;
						//// state's string
						let ss = ...;
						a.par_iter().enumerate().for_each(|(e, i)| {
							let min = MBAEA[i];
							let max = MBAEA[i+1];
							match e.t {
								0 => {
									for x in min..max {
										'inner:	for x in 0..e.len {
											if ss[x] != ts[x] {
												continue 'inner;
											}
										}
										AOV[i][n] = 1;
									}
								},
								macro_rules! set_matches($invert:expr) {
									for x in min..max {

										AOV[i][n] = 2;
									}
								}
								2 => {
									set_matches!(false)
								},
								3 => {
									set_matches!(true)
								},
								4 => {
									AOV[i] = vec![2; max - min];
								},
								5 => {
									AOV[i] = vec![min..max.collect(); max - min];
								},
								6 => {

								}
							}
						}
					```*/
					////////////////////





					//// *p*receeding *A*ny *w*ild *c*ard
					let pawc = false;
					let decisively_gulped = 0;
					p:	for (;;) {
						if (++sc == a.length) {
							return true;
						} else {cur_state = a[sc]}
						switch(cur_state.t) {
							case 0:
								s:	for (;;) {
									if (str.length < cur_state.v.length + swallowed) {
										return !1;
									} else {
										for (let i = 0; i < cur_state.v.length; i++) {
											if (cur_state.v[i] !== str[i]) {
												swallowed++;
												break s;
											}
										}
										continue p;
									}
								}
							//// case 0 exits in all branches via labeled breaks and continues

							case 2:
								////TODO
							break;

							case 3:
								////TODO
							break;

							case 4:
								swallowed++;
							break;

							case 5:
								pawc = true;
							break;
						}
					}
					return true;
				};

			// }//////////////





			break;
			case 2:
				try {
					matcher = new RegExp(search);
				} catch (err) {
					error(err);
					return 1;
				};
			break;
		}

		let img;

		// remove the old images from the match area
			$match_area.html("");

						
		// match count
		let matchc = 0;
		for (let i = 0; i < imgs.length; i++) {
			img = imgs[i];
			//irre: JS sucks: no match control flow construct. switch statements look soo ugly comparatively
			//irre: I love how the switch statement is probably going to execute for every run, instead of only once beforehand, since JS sucks
			switch (search_mode) {
				case 0://elab: == fixed substr comparison
				// console.log(`${search} IN ${img.title} == ${search.includes(img.title)}`);
					if (img.title.includes(search)) {
						add_img(img);
						matchc++;
					}
				break;
				case 1://elab: == glob matching
					if (matcher.is_match(img.title)) {
						add_img(img);
						matchc++;
					}
				break;
				case 2://elab: == match with regex
					if (matcher.test(img.title)) {
						add_img(img);
						matchc++;
					}
				break;
			}
		}
		info(`found ${matchc} matches`);
		if (matchc != 0) {
			$match_area.addClass("with_matches");
		}

	});

	$search_box.keyup(e => {
		//= Ret
        if (e.which === 13) {
            $("#perform_search").click();
        }
    });
})();