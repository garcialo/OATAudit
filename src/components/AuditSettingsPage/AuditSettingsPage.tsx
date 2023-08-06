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
import { JoinedPage, Page, Page_state } from "../interfaces";

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
			<p>Checklist: {current_audit.checklist.name} (can't be changed)</p>

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
	const label_update_page_name = useId();
	const label_update_page_url = useId();
	const label_new_page_state_name = useId();
	const label_new_page_state_instructions = useId();

	const original_name = page.name;
	const original_url = page.url;

	const [name, setName] = useState(original_name);
	const [url, setUrl] = useState(original_url);
	const [new_page_state_name, setNewPageStateName] = useState("");
	const [new_page_state_instructions, setNewPageStateInstructions] =
		useState("");

	const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value);
	};

	const handleNewPageStateName = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewPageStateName(event.target.value);
	};

	const handleNewPageStateInstructions = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewPageStateInstructions(event.target.value);
	};

	async function handleUpdatePage(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		try {
			await db.pages.update(page.id, {
				name: name,
				url: url,
			});
		} catch (error) {
			console.log("Failed to update page: " + name + "::" + error);
		}
	}

	async function handleNewPageState(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		try {
			const new_page_state_ID = await db.page_states.add({
				name: new_page_state_name,
				page_ID: page.id,
				instructions: new_page_state_instructions,
			});

			const new_page_state_ID_number = Number(new_page_state_ID);

			await db.pages
				.where("id")
				.equals(page.id)
				.modify((this_page: Page) =>
					this_page.page_state_IDs.push(new_page_state_ID_number)
				);
		} catch (error) {
			console.log("Failed to create page state: " + name + "::" + error);
		}
	}

	return (
		<>
			<Form onSubmit={handleUpdatePage}>
				<fieldset>
					<legend>
						Page: {page.name} (id:{page.id})
					</legend>
					<label htmlFor={label_update_page_name}>
						Page Name: {original_name != name ? <Updated /> : null}
					</label>
					<br />
					<input
						id={label_update_page_name}
						value={name}
						onChange={handleName}
					/>
					<br />
					<label htmlFor={label_update_page_url}>
						Page URL: {original_url != url ? <Updated /> : null}
					</label>
					<br />
					<input
						id={label_update_page_url}
						value={url}
						onChange={handleUrl}
					/>
					<input type="submit" value={"Update page"} />
				</fieldset>
			</Form>

			{page.page_states.map((page_state) => (
				<PageStateSettings page_state={page_state} />
			))}

			<Form onSubmit={handleNewPageState}>
				<fieldset>
					<legend>Add Page State to {page.name}</legend>
					<label htmlFor={label_new_page_state_name}>
						Page State Name:{" "}
					</label>
					<br />
					<input
						id={label_new_page_state_name}
						onChange={handleNewPageStateName}
					/>
					<br />
					<label htmlFor={label_new_page_state_instructions}>
						Page State Instructions:{" "}
					</label>
					<br />
					<textarea
						id={label_new_page_state_instructions}
						onChange={handleNewPageStateInstructions}
					/>
					<input type="submit" value={"Create page state"} />
				</fieldset>
			</Form>
		</>
	);
}

function PageStateSettings({ page_state }: { page_state: Page_state }) {
	const label_update_page_state_name = useId();
	const label_update_page_state_instructions = useId();

	const original_name = page_state.name;

	let original_instructions = "";
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

	async function handleUpdatePageState(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		try {
			if (page_state.id)
				await db.page_states.update(page_state.id, {
					name: name,
					instructions: instructions,
				});
		} catch (error) {
			console.log("Failed to update page state: " + name + "::" + error);
		}
	}

	return (
		<Form onSubmit={handleUpdatePageState}>
			<fieldset>
				<legend>
					Page State: {page_state.name} (id={page_state.id})
				</legend>
				<label htmlFor={label_update_page_state_name}>
					Page State Name:{" "}
					{original_name != name ? <Updated /> : null}
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
					{original_instructions != instructions ? <Updated /> : null}
				</label>
				<br />
				<textarea
					id={label_update_page_state_instructions}
					value={instructions}
					onChange={handleInstructions}
				/>
				<input type="submit" value={"Update page state"} />
			</fieldset>
		</Form>
	);
}

function Updated() {
	return <>**Updated** </>;
}
