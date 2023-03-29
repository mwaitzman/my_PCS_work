import React from 'react'
import "./post.css";
import Comment from './Comment';
export default function Post({ post: { title, body, author, date, comments } }) {
	return (
		<div className="post">
			<h2>{title}</h2>
			<h3>by {author} on {new Date(date).toLocaleString()} </h3>
			<article>{body}</article>
			<div className="comments">
				{comments?.length > 0
				? comments.map((comment, idx) => <Comment key={idx} comment={comment}/>)
				: <h4>no comments for this post yet</h4>
				}
			</div>
		</div>
	);
}
