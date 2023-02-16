import React from "react";
export default function({comments}) {
	return (
		<ul className="comments">
			{comments.map(c => {(
				<li key={c.id}>
					<span className="commenter_name">{c.name}</span>
					<span className="commentor_email">{c.email}</span>
					<p className="comment_body">{c.body}</p>
				</li>
			)
			})}
		</ul>
	);
}