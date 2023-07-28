/* eslint-disable react-refresh/only-export-components */
import setPageTitle from "../../setPageTitle";
import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import useJoinedAudit from "../../hooks/useJoinedAudit";

export async function auditSettingsLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const audit_ID = Number(url.searchParams.get("audit_ID"));

	return { given_audit_ID: audit_ID };
}

export default function AuditSettingsPage() {
	setPageTitle("Audit Settings - OAT Audit");

	const { given_audit_ID } = useLoaderData() as {
		given_audit_ID: number;
	};

	const current_audit = useJoinedAudit(given_audit_ID);

	if (!current_audit) {
		return null;
	} else {
		setPageTitle(
			"Audit Settings: " + current_audit.audit.name + " - OAT Audit"
		);
	}

	return (
		<>
			<main>
				<h1>Audit Settings: {current_audit.audit.name}</h1>
				<h2>Audit Name</h2>
				<p>Current: {current_audit.audit.name}</p>
				<label>New Audit Name:</label>
				<input type="text" />
				<input type="submit" value="Update Audit Name" />

				<h2>Audit Scope</h2>
				<section>
					<h3>Home Page</h3>
					<button>Edit Home Page</button>
					<p>url: http://example.com</p>
					<h4>Page States: Home Page</h4>
					<fieldset>
						<legend>Initial</legend>
						<p>Instructions: Close the "sign up" pop up.</p>
					</fieldset>
				</section>

				<section>
					<h3>Editing Home Page</h3>
					<button>Save Home Page</button>
					<p>url: http://example.com</p>
					<label>New url:</label>
					<input type="text" />
					<h4>Page States: Home Page</h4>
					<fieldset>
						<legend>Initial</legend>
						<label>New Page State Name</label>
						<input type="text" />
						<label>Instructions:</label>
						<textarea></textarea>
						<button>Save Home Page</button>
					</fieldset>
				</section>
			</main>
		</>
	);
}
