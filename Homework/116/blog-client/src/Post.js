import React from 'react'

export default function Post({ post: { title, body, author, date } }) {

	return (
		<div className="post">
			<h2>{title}</h2>
			<h3>by {author} on {date} </h3>
			<article>{body}</article>
		</div>
	)
}
