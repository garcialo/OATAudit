/* eslint-disable react-refresh/only-export-components */
import { useId, useState } from "react";
import setPageTitle from "../../setPageTitle";
import {
	type LoaderFunctionArgs,
	useLoaderData,
	Link,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { IssueContent, JoinedAudit, JoinedPage } from "../../interfaces";
import useJoinedAudit from "../../hooks/useJoinedAudit";

export async function auditLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const audit_ID = Number(url.searchParams.get("audit_ID"));
	const page_ID = Number(url.searchParams.get("page_ID"));
	const page_state_ID = Number(url.searchParams.get("page_state_ID"));

	return {
		given_audit_ID: audit_ID,
		given_page_ID: page_ID,
		given_page_state_ID: page_state_ID,
	};
}

export default function AuditPage() {
	setPageTitle("Audit - OAT Audit");

	const navigate = useNavigate();

	const { given_audit_ID, given_page_ID, given_page_state_ID } =
		useLoaderData() as {
			given_audit_ID: number;
			given_page_ID: number;
			given_page_state_ID: number;
		};

	const audit = useJoinedAudit(given_audit_ID);

	if (!audit) return null;

	const isValid = validateUrl({
		given_page_ID: given_page_ID,
		given_page_state_ID: given_page_state_ID,
		joined_audit: audit,
	});

	// using useState resulted in endless loops; need to look into it
	let view = "audit";
	let id = audit.id;

	if (given_page_state_ID && isValid) {
		view = "page_state";
		id = given_page_state_ID;
	} else if (given_page_ID && isValid) {
		view = "page";
		id = given_page_ID;
	}

	return (
		<main>
			<h1>{audit.name}</h1>
			<Link to={"/audit/settings?audit_ID=" + audit.id}>
				{"Audit Settings"}
			</Link>
			<PageAndStateNav pages={audit.pages} audit_ID={audit.id} />
			<h2>
				Issues - {view} - {id}
			</h2>
			<IssueTable issues={audit.issues} view={view} id={id} />
		</main>
	);
	/* Commenting out until actions exist
				<section aria-labelledby="actions">
					<h2 id="actions">Actions</h2>
					<p>Action Content</p>
				</section>
	*/
}

function PageAndStateNav({
	pages,
	audit_ID,
}: {
	pages: JoinedPage[];
	audit_ID: number;
}) {
	const [urlParams, setUrlParams] = useSearchParams();

	const handleAll = () => {
		setUrlParams({ audit_ID: "" + audit_ID });
	};

	const handlePage = (page_ID: number) => {
		setUrlParams({ audit_ID: "" + audit_ID, page_ID: "" + page_ID });
	};

	const handlePageState = (page_state_ID: number) => {
		setUrlParams({
			audit_ID: "" + audit_ID,
			page_state_ID: "" + page_state_ID,
		});
	};

	return (
		<nav>
			<h2>Pages</h2>
			<button type="button" onClick={handleAll}>
				All Pages
			</button>
			{pages.map((page) => (
				<>
					<h3 key={page.id}>
						<button
							type="button"
							onClick={() => handlePage(page.id)}
						>
							{page.name} (id:{page.id})
						</button>
					</h3>
					<ul>
						{page.page_states.map((page_state) => (
							<li key={page_state.id}>
								<button
									type="button"
									onClick={() =>
										handlePageState(Number(page_state.id))
									}
								>
									{page_state.name} (id:{page_state.id})
								</button>
							</li>
						))}
					</ul>
				</>
			))}
		</nav>
	);
}

function IssueTable({
	issues,
	view,
	id,
}: {
	issues: IssueContent[];
	view: string;
	id: number;
}) {
	return (
		<table>
			<thead>
				<tr>
					<th id="issue-description">Issue Description</th>
					<th>Issue Status</th>
					<th>Check Description</th>
					{view === "audit" && <th>Page State Name</th>}
					{view === "page" && <th>Page State Name</th>}
					{view === "audit" && <th>Page Name</th>}
				</tr>
			</thead>
			<tbody>
				<IssueRows issue_content_array={issues} view={view} id={id} />
			</tbody>
		</table>
	);
}

function IssueRows({
	issue_content_array,
	view,
	id,
}: {
	issue_content_array: IssueContent[];
	view: string;
	id: number;
}) {
	// display content if it matches the view/id
	// i.e. only issues for view="page_state" and id="1" would show issues for page_state with id=1
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
					{view === "audit" && (
						<td>{issue_content.page_state.name}</td>
					)}
					{view === "page" && (
						<td>{issue_content.page_state.name}</td>
					)}
					{view === "audit" && <td>{issue_content.page.name}</td>}
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

function validateUrl({
	given_page_ID,
	given_page_state_ID,
	joined_audit,
}: {
	given_page_ID: number;
	given_page_state_ID: number;
	joined_audit: JoinedAudit;
}) {
	let page_in_audit = false;
	let page_state_in_audit = false;

	for (const page of joined_audit.pages) {
		if (page.id === given_page_ID) {
			page_in_audit = true;
		}

		const page_state_array = page.page_states;
		for (const page_state of page_state_array) {
			if (page_state.id === given_page_state_ID) {
				page_state_in_audit = true;
			}
		}
	}

	if (given_page_state_ID && page_state_in_audit) {
		return true;
	} else if (given_page_ID && page_in_audit) {
		return true;
	}
	return false;
}
