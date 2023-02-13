import React from "react";

export default function Company(props) {
	const company = props.company;
	return (
		<div
			style={{
				overflow: "auto",
				height: "80%",
				borderStyle: "solid"
			}}
		>
			<h4>
				{company.name}
			</h4>
			<div
				style={{fontStyle: "italic"}}
			>
				{company.catchPhrase}
			</div>
			<div>{company.bs}</div>
		</div>
	);
}