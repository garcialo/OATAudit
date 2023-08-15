import { IssueContent } from "../../interfaces";
import { useId } from "react";

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
					<th>ID</th>
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
							<td>{issue_content.issue.id}</td>
							<td>
								<textarea
									name={"" + issue_content.issue.id}
									aria-labelledby={
										label_issue_description_textarea
									}
									defaultValue={
										issue_content.issue.description
									}
								/>
							</td>
							<td>
								<IssueStatusSelect
									label={label_issue_status_select}
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

function IssueStatusSelect({ label }: { label: string }) {
	const statuses: { text: string; value: string }[] = [
		{ text: "Check Incomplete", value: "incomplete" },
		{ text: "Pass", value: "pass" },
		{ text: "Fail", value: "fail" },
		{ text: "Not Applicable", value: "na" },
		{ text: "Notes / Other", value: "notes" },
	];

	return (
		<select aria-labelledby={label}>
			{statuses.map((status) => (
				<option key={status.value} value={status.value}>
					{status.text}
				</option>
			))}
		</select>
	);
}
