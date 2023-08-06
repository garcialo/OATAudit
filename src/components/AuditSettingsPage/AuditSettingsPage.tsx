/* eslint-disable react-refresh/only-export-components */
import { useId, useState } from "react";
import {
	Form,
	type LoaderFunctionArgs,
	useLoaderData,
	Link,
} from "react-router-dom";
import useJoinedAudit from "../../hooks/useJoinedAudit";
import setPageTitle from "../../setPageTitle";
import { db } from "../../db";
import { JoinedPage, Page_state } from "../interfaces";

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
	const label_name_section = useId();
	const label_scope_section = useId();

	const current_audit = useJoinedAudit(given_audit_ID);

	const [new_audit_name, setNewAuditName] = useState("");

	// audit.name input event handling
	const handleAuditNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewAuditName(event.target.value);
	};

	// current_audit is used throughout the return and may be null
	if (!current_audit) {
		return null;
	} else {
		setPageTitle("Audit Settings: " + current_audit.name + " - OAT Audit");
	}

	const saveAuditName = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

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
			<h1>
				Audit Settings:{" "}
				<Link to={"/audit?audit_ID=" + current_audit.id}>
					{current_audit.name}
				</Link>
			</h1>

			<section aria-labelledby={label_name_section}>
				<h2 id={label_name_section}>Audit Name</h2>
				<Form onSubmit={saveAuditName}>
					<p>Current Audit Name: {current_audit.name}</p>
					<label htmlFor={label_id_audit_name}>
						New Audit Name:{" "}
					</label>
					<input
						type="text"
						id={label_id_audit_name}
						value={new_audit_name}
						onChange={handleAuditNameChange}
					/>
					<input type="submit" value="Update audit name" />
				</Form>
			</section>

			<section aria-labelledby={label_scope_section}>
				<h2 id={label_scope_section}>Audit Scope</h2>
				{current_audit.pages.map((page) => (
					<PageSettings page={page} />
				))}
			</section>
		</main>
	);
}

function PageSettings({ page }: { page: JoinedPage }) {
	const handleAddPageState = (name: string, instructions: string) => {
		console.log(
			"Handling adding page state " +
				name +
				" to " +
				page.name +
				" with instructions: " +
				instructions
		);
	};

	return (
		<>
			<p>===START PAGE===</p>
			<p>= Page ID {page.id}</p>
			<p>= Page Name {page.name}</p>
			<p>= Page URL {page.url}</p>
			{page.page_states.map((page_state) => (
				<PageStateSettings
					page_state={page_state}
					onUpdatePageState={handleAddPageState}
				/>
			))}
			<p>===END PAGE===</p>
		</>
	);
}

function PageStateSettings({
	page_state,
	onUpdatePageState,
}: {
	page_state: Page_state;
	onUpdatePageState: (name: string, instructions: string) => void;
}) {
	const label_update_page_state_name = useId();
	const label_update_page_state_instructions = useId();

	const original_name = page_state.name;

	let original_instructions = " ";
	if (page_state.instructions) {
		original_instructions = page_state.instructions;
	}

	const [name, setName] = useState(original_name);
	const [instructions, setInstructions] = useState(original_instructions);

	const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleInstructions = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setInstructions(event.target.value);
	};

	const savePageState = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			//await db.audits.update(current_audit.id, { name: new_audit_name });
			console.log(
				"Update DB with new Page State " +
					name +
					" and instructions: " +
					instructions
			);
		} catch (error) {
			console.log("Failed to create page state: " + name + "::" + error);
		}
	};

	return (
		<fieldset>
			<legend>
				{page_state.name} :: id:{page_state.id}
			</legend>
			<label htmlFor={label_update_page_state_name}>
				Page State Name: {original_name != name ? "**Updated** " : null}
			</label>
			<br />
			<input
				id={label_update_page_state_name}
				value={name}
				onChange={handleName}
			/>
			<br />
			<label htmlFor={label_update_page_state_instructions}>
				Page State Instructions:{" "}
				{original_instructions != instructions ? "**Updated** " : null}
			</label>
			<br />
			<textarea
				id={label_update_page_state_instructions}
				value={instructions}
				onChange={handleInstructions}
			/>
			<br />
			<input
				type="submit"
				onClick={() => {
					setName("");
					onUpdatePageState(name, instructions);
				}}
				value={"Update page state"}
			/>
		</fieldset>
	);
}
