/* eslint-disable react-refresh/only-export-components */
import { useId, useState } from "react";
import { Form, type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import useJoinedAudit from "../../hooks/useJoinedAudit";
import setPageTitle from "../../setPageTitle";
import { db } from "../../db";

export async function auditSettingsLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const audit_ID = Number(url.searchParams.get("audit_ID"));

	return { given_audit_ID: audit_ID };
}

export default function AuditSettingsPage() {
	const { given_audit_ID } = useLoaderData() as {
		given_audit_ID: number;
	};

	const label_id_audit_name = useId();
	const current_audit = useJoinedAudit(given_audit_ID);

	const [new_audit_name, setNewAuditName] = useState("");

	// Begin audit.name input event handling
	const handleAuditNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewAuditName(event.target.value);
		console.log("Audit Name Changed " + event.target.value);
	};

	// End audit.name input event handling

	// current_audit is used throughout the return and may be null
	if (!current_audit) {
		return null;
	} else {
		setPageTitle("Audit Settings: " + current_audit.name + " - OAT Audit");
	}

	const saveAuditName = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(new_audit_name);

		try {
			await db.audits.update(current_audit.id, { name: new_audit_name });
		} catch (error) {
			console.log(
				"Failed to rename audit: " + current_audit.id + "::" + error
			);
		}
	};

	return (
		<main>
			<h1>Audit Settings: {current_audit.name}</h1>
			<Form onSubmit={saveAuditName}>
				<h2>Audit Name</h2>
				<p>Current Audit Name: {current_audit.name}</p>
				<label htmlFor={label_id_audit_name}>New Audit Name: </label>
				<input
					type="text"
					id={label_id_audit_name}
					value={new_audit_name}
					onChange={handleAuditNameChange}
				/>
				<input type="submit" value="Update audit name" />
			</Form>
		</main>
	);
}
