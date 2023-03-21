import overlay_company_info from "./overlay_company_info";
export default async function main() {
  // SL - why are you using globals at all, and once you decided to use globals, what problems are you avoiding by using globalThis instead of just plain old globals or window?
  // SL - why is there a param named starting_comment_idx controlling how many posts we see? What does comment have to do with anything?
	globalThis.show_3_posts = function(posts, starting_comment_idx) {
		let buf = "<ul>";
		let n = 0;
		for (let idx = starting_comment_idx; idx < posts.length && starting_comment_idx + idx < 3; idx++) {
			const post = posts[idx];

      // SL - oncClick is kind of frowned upon nowadays. In REACT it looks like we use it but we arent really. More common nowadays is to attach event listeners to the element in code
      // in any event this wont work here as your using webpack so toggle_show_posts_comments is not global and onClick wont find it.
      // now I see why you made show_3_posts global above. This is really not a great design. Dont use onClick and dont make them global.
			buf += `<li class="post"><div class="post_num">post #${idx + 1}</div><h4>${post.title}</h4><p>${post.body}</p><div id="comment_display__${post.id}" style="display: none"></div><button id="button_comment__${post.id}" onclick="toggle_show_posts_comments(${post.id})">show comments</button></li>`;
			n++;
		}
		starting_comment_idx += n;
		// return `<div>showing posts ${starting_comment_idx + 1 - n} through ${starting_comment_idx + 3 - n} of ${posts.length}</div>`
		return buf + `</ul><div id="posts_nav">${show_previous_posts_button(posts, starting_comment_idx)}<div>showing posts ${starting_comment_idx - n + 1} through ${starting_comment_idx - n + 3} of ${posts.length}</div>${show_next_posts_button(posts, starting_comment_idx)}</div>`;
	};
	console.log("AAAAA", globalThis.show_3_posts);
	let dpy = document.getElementById('dpy');

  // SL - nothing wrong with .then, but more common nowadays is to use async await. I hope nothing goes wrong, you have no catch and you have no check to make sure response status code was success...
	let users = await fetch(`https://jsonplaceholder.typicode.com/users/`)
		.then(resp => resp.json())
	; // SL - a semi colon on its own line is unusual...

	//SECURITY: we can assume that the data coming from the server is trusted and sanitized, so don't mind stringifying it with additions as innerHTML

  // SL - your ids are wrong. Each user has an id and they start from 1. Your using index which starts from 0. We always get posts for next blog (and first doesnt get any)
		let inner_html = `<ul id="users_list">${users.reduce(
			(buf, user, idx) => {
        // SL - I dont think you need to spend so much time worrying about this. If url doesnt have prefix, dont include prefix. When clicked it will be http and server can redirect to https if they want.
				return buf + `<li id="user_${idx}" class="user"><h4 class="user__name">${user.name}</h4><a
				class="user__website"
				href="${
				(
					user.website.startsWith("https://")
					|| user.website.startsWith("http://")
				)
					? user.website
					//TODO: if `user.website` only supports HTTP, and not HTTPS, display the HTTP link? Or do browsers automatically redirect in that case or what? What about other protocols (e.g. Gemini)? Should it just have a list of protocols in preferred order and try navigating to each and based on the response status code, display the highest one that's successful (probably defaulting to HTTP if none work (so assuming the server's down for maintenance or w/e))? Periodic refresh if none work (or even if they do (at least for HTTPS not working but HTTP working?)?)?
					: "https://" + user.website
			}">${user.website}</a><div
			"class="user__company"
			id="user__company__${idx}"
			>view company info</div></li>`
				// + "</ul>";
			},
			""
		)}</ul>`;
		dpy.innerHTML = inner_html;
		for (let idx = 0; idx < users.length; idx++) {
				//// clicking on company => show company info in popup box
				document
				.getElementById(`user__company__${idx}`)
				.addEventListener("click", () => {
					// console.log(users[idx].company);
					overlay_company_info(users[idx].company);
				});

        // SL - probably should have a pointer cursor / link look / something so know this can be clicked without looking at code
				//// clicking on user => load users posts
				document
				.getElementById(`user_${idx}`)
				.addEventListener("click", e => {
					if (e.target.id !== `user__company__${idx}`) {
						fetch(`https://jsonplaceholder.typicode.com/posts?userId=${idx}`)
						.then(resp => resp.json())
						.then(posts => {
              // SL - why are freezing this? Your making this immutable because why? And yes, the reload is a full page reload. Why? Why not reinvoke main?
							//// think this freeze is incorrect but who really cares here. The reload is hacky too but w/e
							const back_to_blogs = Object.freeze("<div style=\"text-decoration: underline; color: #60C98F\" onclick=\"window.location.reload();\">Back to users list</div>");
							console.table(posts, ["id"]);
							if (posts.length === 0) {
								dpy.innerHTML = `<div>${users[idx].name} hasn't posted yet</div>${back_to_blogs}`
							} else {
								dpy.innerHTML = show_3_posts(posts, 0) + back_to_blogs;
							}
						});
					}
				});
			};
}




// SL - nice
function show_previous_posts_button(posts, idx) {
	if (posts.length >= idx) {
		return "<button disabled=\"true\">show previous posts</button>";
	} else {
		return "<button>show previous posts</button>";
	}

}


function show_next_posts_button(posts, idx) {
	if (idx + 3 < posts.length) {
		return `<button onclick="globalThis.show_3_posts(posts, ${idx});">show next posts</button>`;
	} else {
		return "<button disabled=\"true\">show next posts</button>";
	}
}


/// gets the given post's comments and changes the button to show/hide the comments
function toggle_show_posts_comments(id) {
  // SL - b and d? First of all a and b arent great names for variables. Second, arent they both the same element? Why do we get it twice?
	const b = document.getElementById(`button_comment__${id}`);
	const d = document.getElementById(`button_comment__${id}`);
	if (b.innerText === "show comments") {
		d.innerHTML = get_comments(post_id);

		b.inner_text = "hide comments";
	} else {
		b.innerText = "show comments";

	}
};

// SL - make your code work so I can see comments
window.toggle_show_posts_comments = toggle_show_posts_comments;


async function get_comments(post_id) {
	const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post_id}`)
	.then(resp => resp.json);
	console.table(comments);
	//TODO: render comments nicely for user
	return comments;
}

// SL - I think maybe you made this a little more complex then needed...
