/* eslint-disable react-refresh/only-export-components */
import setPageTitle from "../../setPageTitle";
import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { IssueContent } from "../../interfaces";
import useJoinedAudit from "../../hooks/useJoinedAudit";

export async function auditLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const audit_ID = Number(url.searchParams.get("audit_ID"));
	const checklist_ID = Number(url.searchParams.get("checklist_ID"));

	return { given_audit_ID: audit_ID, given_checklist_ID: checklist_ID };
}

export default function AuditPage() {
	setPageTitle("Audit - OAT Audit");

	const { given_audit_ID } = useLoaderData() as {
		given_audit_ID: number;
	};

	return (
		<>
			<PageAndStateNav />
			<main>
				<h2>Issues</h2>
				<IssueTable audit_ID={given_audit_ID} />
			</main>
		</>
	);
	/* Commenting out for now
				<section aria-labelledby="actions">
					<h2 id="actions">Actions</h2>
					<p>Action Content</p>
				</section>
	*/
}

function PageAndStateNav() {
	return (
		<nav>
			<h2>Pages</h2>
			<button>All Pages</button>
			<h3>
				<button>Page.Name</button>
			</h3>
			<ul>
				<li>
					<button>PageState.Name</button>
				</li>
			</ul>
		</nav>
	);
}

function IssueTable({ audit_ID }: { audit_ID: number }) {
	const audit = useJoinedAudit(audit_ID);

	if (!audit) return null;

	return (
		<table>
			<thead>
				<tr>
					<th id="issue-description">Issue Description</th>
					<th>Issue Status</th>
					<th>Check Description</th>
					<th>Page State Name</th>
					<th>Page Name</th>
				</tr>
			</thead>
			<tbody>
				<IssueRows issue_content_array={audit.issues} />
			</tbody>
		</table>
	);
}

function IssueRows({
	issue_content_array,
}: {
	issue_content_array: IssueContent[];
}) {
	return (
		<>
			{issue_content_array.map((issue_content) => (
				<tr key={issue_content.issue.id}>
					<td>
						<textarea
							name={"" + issue_content.issue.id}
							aria-labelledby="issue-description"
							defaultValue={issue_content.issue.description}
						/>
					</td>
					<td>
						<IssueStatusSelect />
					</td>
					<td>{issue_content.check.description}</td>
					<td>{issue_content.page_state.name}</td>
					<td>{issue_content.page.name}</td>
				</tr>
			))}
		</>
	);
}

function IssueStatusSelect() {
	const statuses: { text: string; value: string }[] = [
		{ text: "Check Incomplete", value: "incomplete" },
		{ text: "Pass", value: "pass" },
		{ text: "Fail", value: "fail" },
		{ text: "Not Applicable", value: "na" },
		{ text: "Notes / Other", value: "notes" },
	];

	return (
		<select>
			{statuses.map((status) => (
				<option key={status.value} value={status.value}>
					{status.text}
				</option>
			))}
		</select>
	);
}
