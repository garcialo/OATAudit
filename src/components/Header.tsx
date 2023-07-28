import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<Link to={"/"}>Home</Link>
			<ul>
				<li>
					<Link to={"rules"}>Rules</Link>
				</li>
			</ul>
		</header>
	);
}
