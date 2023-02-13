import React, {useState} from "react";
import Company from "./company";


export default function User(props) {
	const {user, idx} = props;
	const [viewingCompany, setViewingCompany] = useState(false);
	function toggleCompanyInfo() {
		setViewingCompany(!viewingCompany);
	  }
	return (
		<li
			id={`user_${idx}`}
			className="user"
		>
			<h4 className="user__name">{user.name}</h4>
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