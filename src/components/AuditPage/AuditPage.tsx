/* eslint-disable react-refresh/only-export-components */
import setPageTitle from "../../setPageTitle";
import { type LoaderFunctionArgs, useLoaderData, Link } from "react-router-dom";
import { IssueContent, JoinedPage } from "../../interfaces";
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

	const audit = useJoinedAudit(given_audit_ID);

	if (!audit) return null;

	return (
		<main>
			<h1>{audit.name}</h1>
			<Link to={"/audit/settings?audit_ID=" + audit.id}>
				{"Audit Settings"}
			</Link>
			<PageAndStateNav pages={audit.pages} />
			<h2>Issues</h2>
			<IssueTable issues={audit.issues} />
		</main>
	);
	/* Commenting out for now
				<section aria-labelledby="actions">
					<h2 id="actions">Actions</h2>
					<p>Action Content</p>
				</section>
	*/
}

function PageAndStateNav({ pages }: { pages: JoinedPage[] }) {
	return (
		<nav>
			<h2>Pages</h2>
			<button>All Pages</button>
			{pages.map((page) => (
				<>
					<h3 key={page.id}>
						<button>{page.name}</button>
					</h3>
					<ul>
						{page.page_states.map((state) => (
							<li key={state.id}>
								<button>{state.name}</button>
							</li>
						))}
					</ul>
				</>
			))}
		</nav>
	);
}

function IssueTable({ issues }: { issues: IssueContent[] }) {
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
				<IssueRows issue_content_array={issues} />
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
