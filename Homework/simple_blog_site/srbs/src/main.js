import React from "react";
import ReactDOM from 'react-dom/client';
import Posts from "./posts";
import User from "./user";


export default async function() {
	let dpy = document.getElementById('dpy');
	let users = await fetch(`https://jsonplaceholder.typicode.com/users/`)
		.then(resp => resp.json())
	;

	let posts = null;
	const viewPostsOf = userId => {
		posts = <Posts userId={userId}/>;
		console.table(posts);
	}

	let comments = null;
	const viewCommentsOn = postId => {
		comments = (<Comments postId={postId}/>);
		console.table(comments);
	}

	const root = ReactDOM.createRoot(document.getElementById("dpy"));
	root.render(
		<>
		{
			comments
			? comments
			:
			posts
			? posts
			: (
				<ul id="users_list">
				{users.map(
					(u, idx) => <User user={u} idx={idx} key={u.id} viewPostsOf={viewPostsOf}/>
				)}
			</ul>
			)
		}
		<a style={{textDecoration: "underline", color: "#60C98F"}} href="/">Back to users list</a>
		</>
	);
}





function show_previous_posts_button(posts, idx) {
	if (posts.length >= idx) {
		return "<button disabled=\"true\">show previous posts</button>";
	} else {
		return "<button>show previous posts</button>";
	}

}


function show_next_posts_button(posts, idx) {
	if (idx + 3 < posts.length) {
		return `<button onclick="show_3_posts(posts, ${idx});">show next posts</button>`;
	} else {
		return "<button disabled=\"true\">show next posts</button>";
	}
}


/// gets the given post's comments and changes the button to show/hide the comments
function toggle_show_posts_comments(id) {
	const b = document.getElementById(`button_comment__${id}`);
	const d = document.getElementById(`button_comment__${id}`);
	if (b.innerText === "show comments") {
		d.innerHTML = get_comments(post_id);
		d.style.display = "visible";
		b.inner_text = "hide comments";
	} else {
		b.innerText = "show comments";
		d.style.display= "hidden";
	}
};

function show_3_posts(posts, starting_comment_idx) {
	let buf = "<ul>";
	let n = 0;
	for (let idx = starting_comment_idx; idx < posts.length && starting_comment_idx + idx < 3; idx++) {
		const post = posts[idx];
		buf += `<li class="post"><div class="post_num">post #${idx + 1}</div><h4>${post.title}</h4><p>${post.body}</p><div id="comment_display__${post.id}" style="display: none"></div><button id="button_comment__${post.id}" onclick="toggle_show_posts_comments(${post.id})">show comments</button></li>`;
		n++;
	}
	starting_comment_idx += n;
	// return `<div>showing posts ${starting_comment_idx + 1 - n} through ${starting_comment_idx + 3 - n} of ${posts.length}</div>`
	return buf + `</ul><div id="posts_nav">${show_previous_posts_button(posts, starting_comment_idx)}<div>showing posts ${starting_comment_idx - n + 1} through ${starting_comment_idx - n + 3} of ${posts.length}</div>${show_next_posts_button(posts, starting_comment_idx)}</div>`;
};