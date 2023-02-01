import {useLocation} from "react-router-dom";

export default function Navbar() {
	const path = useLocation().pathname;
	const links = [];
	for (let l of [
		"home",
		"buy_a_home",
		"sell_a_home"
			]) {
				if (path !== '/' + l) {
					links.push(
						<li key={l}>
							<a href={l}>{l.replace('_', ' ')}</a>
						</li>
					);
				}
			}
	return (
		<ul id="navbar">
			{links}
		</ul>
	);
}