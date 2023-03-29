import React from "react";

export default function Comment(comment) {
	return (<div className="comment">
		<h3>{comment.author} at {comment.creation_date}</h3>
		<p>{comment.text}</p>
	</div>);
}