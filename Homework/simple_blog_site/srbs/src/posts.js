import React, {useEffect, useState} from "react";
import Comments from "./comments";


export default function({userId}) {
	const {userPosts, setUserPosts} = useState(null);

	const {comments, setComments} = useState([]);
	const {firstDisplayedPost, setFirstDisplayedPost} = useState(0);

	const getComments = (postId, idx) => {
		showingComments[idx] = true;
		fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
		.then(resp => resp.json())
		.then(resp => {
			comments[idx] = <Comments comments={resp}/>;
			setComments(comments);
		});
	};

	useEffect(
		() => {
			const fetchUserPosts = async () => {
				const uP = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
				.then(resp => resp.json());
				setUserPosts(uP);
			};
			fetchUserPosts();
			const TEN_MINUTES = 1000 * 60 * 10;
			Object.freeze(TEN_MINUTES);
			setInterval(() => fetchUserPosts, TEN_MINUTES);
		},
		[]
	);
	
	const grrrrihatejs = () => {
		let idx;
		let p;
		let rv = [];
		for (idx = firstDisplayedPost; idx <= firstDisplayedPost + 2 && idx < userPosts.length; idx++) {
			p = userPosts[idx];
			rv.push(
				<li key={p.id} className="post">
				<h4>{p.title}</h4>
				<p>post.body</p>
				{
					showingComments[idx] ? (
						<>
							<Comments postId={p.id}/>
							<button onClick={() => {showingComments[idx] = false}}>
								hide comments
							</button>
						</>
					)
					: (
						<>
							{/* <Comments postId={post.id}/> */}
							<button
							onClick={getComments(p.id, idx)}
							>
								hide comments
							</button>
						</>
					)
				}
			</li>
			);
		}
		setFirstDisplayedPost(idx);
		return rv;
		};

	return (
		<>
			<ul>{grrrrihatejs()}
			</ul>
			<div id="pctl">
				<button onClick={setFirstDisplayedPost(Math.max(0, firstDisplayedPost - 3))}>show previous posts</button>
				<span>Showing posts {firstDisplayedPost}-{Math.min(userPosts.length, firstDisplayedPost + 3)} of {userPosts.length}</span>
				<button onClick={setFirstDisplayedPost(Math.min(userPosts.length, firstDisplayedPost + 3))}>show previous posts</button>
			</div>
		</>
	);
}