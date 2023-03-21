import React, {useState} from "react";
import Company from "./company";


export default function({user, idx, viewPostsOf}) {
	const [viewingCompany, setViewingCompany] = useState(false);
	const showPosts = () => {
		viewPostsOf(user.id);
	};
	function toggleCompanyInfo() {
		setViewingCompany(!viewingCompany);
	  }
	return (
		<li
			id={`user_${idx}`}
			className="user"
		>
			<h4
			className="user__name"
			onClick={showPosts}
			>{user.name}</h4>
			<a
			className="user__website"
			href={
				( user.website.startsWith("https://")
				|| user.website.startsWith("http://")
				) ? user.website
				: "https://" + user.website
			}>
				{user.website}
			</a>
			<div
			onClick={toggleCompanyInfo}
			className="user__company"
			id={`user__company__${idx}`}
			>
				{viewingCompany
				? <Company company={user.company}/>
				: ""
				}
				<div style={{textDecoration: "underline"}}>{viewingCompany ? "hide company info" : "view company info"}</div>
			</div>
		</li>
	);
}

// SL - doesnt work. Clicking a user calls viewPostsOf which creates some jsx but doesnt actually do anything with it, no rerender caused, no posts get loaded...
// I imagine you must have broken it late in the game as theres to much code here for you not have gotten passed posts showing up...
// Again, I think you are complicating things a little more then neccessary here.
