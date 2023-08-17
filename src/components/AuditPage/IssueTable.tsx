import { IssueContent } from "../../interfaces";
import { useId } from "react";
import { db } from "../../db/db";

export default function IssueTable({
	issues,
	view,
	id,
}: {
	issues: IssueContent[];
	view: string;
	id: number;
}) {
	const label_issue_description_textarea = useId();
	const label_issue_status_select = useId();

	return (
		<table>
			<thead>
				<tr>
					{import.meta.env.DEV && <th>ID</th>}
					<th id={label_issue_description_textarea}>
						Issue Description
					</th>
					<th id={label_issue_status_select}>Issue Status</th>
					<th>Check Description</th>
					{view === "audit" && <th>Page State Name</th>}
					{view === "page" && <th>Page State Name</th>}
					{view === "audit" && <th>Page Name</th>}
				</tr>
			</thead>
			<tbody>
				<IssueRows
					issue_content_array={issues}
					view={view}
					id={id}
					label_issue_description_textarea={
						label_issue_description_textarea
					}
					label_issue_status_select={label_issue_status_select}
				/>
			</tbody>
		</table>
	);
}

function IssueRows({
	issue_content_array,
	view,
	id,
	label_issue_description_textarea,
	label_issue_status_select,
}: {
	issue_content_array: IssueContent[];
	view: string;
	id: number;
	label_issue_description_textarea: string;
	label_issue_status_select: string;
}) {
	const handleDescription = async (
		issue_ID: number,
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		console.log(issue_ID + " - " + event.target.value);
		try {
			await db.issues.update(issue_ID, {
				description: event.target.value,
			});
		} catch (error) {
			console.log(
				"Failed to update issue description: " + issue_ID + "::" + error
			);
		}
	};

	return (
		<>
			{issue_content_array.map((issue_content) => {
				let showIssue = true;
				if (
					view === "page_state" &&
					issue_content.page_state.id != id
				) {
					showIssue = false;
				} else if (view === "page" && issue_content.page.id != id) {
					showIssue = false;
				}

				if (showIssue)
					return (
						<tr key={issue_content.issue.id}>
							{import.meta.env.DEV && (
								<td>{issue_content.issue.id}</td>
							)}
							<td>
								<textarea
									name={"" + issue_content.issue.id}
									aria-labelledby={
										label_issue_description_textarea
									}
									defaultValue={
										issue_content.issue.description
									}
									onChange={(event) =>
										handleDescription(
											Number(issue_content.issue.id),
											event
										)
									}
								/>
							</td>
							<td>
								<IssueStatusSelect
									label={label_issue_status_select}
									issue_content_ID={Number(
										issue_content.issue.id
									)}
									issue_content_status={
										issue_content.issue.status
									}
								/>
							</td>
							<td>{issue_content.check.description}</td>
							{view === "audit" && (
								<td>{issue_content.page_state.name}</td>
							)}
							{view === "page" && (
								<td>{issue_content.page_state.name}</td>
							)}
							{view === "audit" && (
								<td>{issue_content.page.name}</td>
							)}
						</tr>
					);
			})}
		</>
	);
}

function IssueStatusSelect({
	label,
	issue_content_ID,
	issue_content_status,
}: {
	label: string;
	issue_content_ID: number;
	issue_content_status: string;
}) {
	const statuses: { text: string; value: string }[] = [
		{ text: "Check Incomplete", value: "incomplete" },
		{ text: "Pass", value: "pass" },
		{ text: "Fail", value: "fail" },
		{ text: "Not Applicable", value: "na" },
		{ text: "Notes / Other", value: "notes" },
	];

	const handleStatus = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		console.log(issue_content_ID + " - " + event.target.value);
		try {
			await db.issues.update(issue_content_ID, {
				status: event.target.value,
			});
		} catch (error) {
			console.log(
				"Failed to update issue description: " +
					issue_content_ID +
					"::" +
					error
			);
		}
	};

	return (
		<select aria-labelledby={label} onChange={handleStatus}>
			{statuses.map((status) => (
				<option
					key={status.value}
					value={status.value}
					selected={issue_content_status === status.value}
				>
					{status.text}
				</option>
			))}
		</select>
	);
}
