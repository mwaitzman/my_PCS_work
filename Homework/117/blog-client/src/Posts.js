import React, { useEffect, useState } from 'react'
import Post from './Post';
import socketIo from 'socket.io-client';
export default function Posts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('http://localhost:8080/posts');
				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(errorText);
				}
				const posts = await response.json();
				setPosts(posts);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	useEffect(() => {
		const io = socketIo('http://localhost:8080');

		io.on('post', newPost => {
			const newPostsArray = [...posts];
			newPostsArray.push(newPost);
			setPosts(newPostsArray);
		});
	}, [posts]);

	return (
		<div>
			{posts.map(post => <Post key={post._id} post={post} />)}
		</div>
	)
}
