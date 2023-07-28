import setPageTitle from "../../setPageTitle";
import AuditList from "./AuditList";
import FormSelectChecklist from "../FormSelectChecklist/FormSelectChecklist";

export default function HomePage() {
	setPageTitle("OAT Audit");

	return (
		<main>
			<h1>OAT Audit</h1>
			<h2>Continue an audit</h2>
			<ul>
				<AuditList />
			</ul>

			<h2>Create an audit</h2>
			<FormSelectChecklist
				actionValue="/audit"
				submitButtonText="Start Auditing!"
			/>
		</main>
	);
}
