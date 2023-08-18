import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<Link to={"/OATAudit/"}>Home</Link>
			<ul>
				<li>
					<Link to={"/OATAudit/checks"}>Checks</Link>
				</li>
				<li>
					<a href="https://github.com/garcialo/OATAudit/wiki">
						OAT Audit Wiki
					</a>
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
