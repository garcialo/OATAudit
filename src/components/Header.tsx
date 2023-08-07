import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<Link to={"/"}>Home</Link>
			<ul>
				<li>
					<Link to={"rules"}>Rules</Link>
				</li>
				<li>
					<a href="https://github.com/garcialo/OATAudit">
						OAT Audit on GitHub
					</a>
				</li>
			</ul>
		</header>
	);
}
