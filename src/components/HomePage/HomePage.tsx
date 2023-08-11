import setPageTitle from "../../setPageTitle";
import AuditList from "./AuditList";

import { Form, useNavigate } from "react-router-dom";
import { useId, useState } from "react";
import ChecklistOptions from "../FormSelectChecklist/ChecklistOptions";
import { db } from "../../db/db";

export default function HomePage() {
	setPageTitle("OAT Audit");
	const selectID = useId();
	const navigate = useNavigate();

	// efforts to set the defaultValue of the select input have failed, so doing useState("1") as a stopgap
	// context, without setting an initial value, selectedChecklist would be null until the select input is changed
	const [selectedChecklist, setSelectedChecklist] = useState("1");

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedChecklist(event.target.value);
	};

	const makeNewAudit = async () => {
		const checklist_ID = Number(selectedChecklist);

		try {
			const page_state_ID = await db.page_states.add({
				name: "Initial",
			});

			const page_state_ID_number = Number(page_state_ID);
			const page_state = await db.page_states.get(page_state_ID_number);

			const page_ID = await db.pages.add({
				name: "Untitled Page",
				page_state_IDs: [page_state_ID_number],
				url: "example.com",
			});
			const page_ID_number = Number(page_ID);
			// revisiting the page_state now that we have a page_ID for the foreign key
			if (page_state && page_state.id)
				await db.page_states.update(page_state.id, {
					page_ID: page_ID_number,
				});

			const db_checklist = await db.checklists.get(checklist_ID);
			const issue_IDs: number[] = [];
			for (const check_ID of db_checklist?.check_IDs || []) {
				const issue_ID = await db.issues.add({
					check_ID: check_ID,
					status: "Check Incomplete",
					page_state_ID: page_state_ID_number,
					page_ID: page_ID_number,
				});
				const issue_ID_number = Number(issue_ID);
				issue_IDs.push(issue_ID_number);
			}
			const audit_ID = await db.audits.add({
				name: "Untitled Audit",
				checklist_ID: checklist_ID,
				page_IDs: [page_ID_number],
				issue_IDs: issue_IDs,
			});
			const audit_ID_number = Number(audit_ID);
			const url = "/audit?audit_ID=" + audit_ID_number;
			console.log("Nav attempt: " + url);
			navigate(url);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main>
			<h1>OAT Audit</h1>
			<h2>Continue an audit</h2>
			<ul>
				<AuditList />
			</ul>

			<h2>Test New Audit</h2>
			<Form>
				<label htmlFor={selectID}>Choose a checklist</label>
				<select
					id={selectID}
					name="checklist_ID"
					onChange={handleSelectChange}
				>
					<ChecklistOptions />
				</select>

				<input
					type="submit"
					value="Start Auditing!"
					onClick={makeNewAudit}
				/>
			</Form>
		</main>
	);
}
