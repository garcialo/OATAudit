/* eslint-disable react-refresh/only-export-components */
import setPageTitle from "../../setPageTitle";
import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { IssueContent } from "../interfaces";
import useJoinedAudit from "../../hooks/useJoinedAudit";

export async function auditLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const audit_ID = Number(url.searchParams.get("audit_ID"));
	const checklist_ID = Number(url.searchParams.get("checklist_ID"));

	return { given_audit_ID: audit_ID, given_checklist_ID: checklist_ID };
}

export default function AuditPage() {
	setPageTitle("Audit - OAT Audit");

	const { given_audit_ID, given_checklist_ID } = useLoaderData() as {
		given_audit_ID: number;
		given_checklist_ID: number;
	};

	return (
		<>
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
			<main>
				<section aria-labelledby="actions">
					<h2 id="actions">Actions</h2>
					<p>Action Content</p>
				</section>
				<h2>Issues</h2>
				{given_checklist_ID ? (
					<NewIssuesTable checklist_ID={given_checklist_ID} />
				) : (
					<IssueTable audit_ID={given_audit_ID} />
				)}
			</main>
		</>
	);
}

function NewIssuesTable({ checklist_ID }: { checklist_ID: number }) {
	const rules = useLiveQuery(async () => {
		const db_checklist = await db.checklists.get(checklist_ID);

		if (!db_checklist) return null;

		const db_rules = await db.rules
			.where("rule_ID")
			.anyOf(db_checklist.rule_IDs)
			.toArray();

		return db_rules;
	}, [checklist_ID]);

	if (!rules) return null;

	return (
		<table>
			<thead>
				<tr>
					<th id="issue-description">Issue Description</th>
					<th>Issue Status</th>
					<th>Rule Description</th>
				</tr>
			</thead>
			<tbody>
				{rules.map((rule) => (
					<tr key={rule.id}>
						<td>
							<textarea
								name="textarea"
								aria-labelledby="issue-description"
							/>
						</td>
						<td>
							<IssueStatusSelect />
						</td>
						<td>{rule.description}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

/*
<td>{issue_content.issue.issue_number}</td>
					<td>
						<textarea
							name={"" + issue_content.issue.id}
							aria-labelledby="issue-description"
							defaultValue={issue_content.issue.description}
						/>
						*/

function IssueTable({ audit_ID }: { audit_ID: number }) {
	/*
	const audit = useLiveQuery(async () => {
		const joined_audit: JoinedAudit = {} as JoinedAudit;

		// setting joined_audit.audit
		const db_audit = await db.audits.get(audit_ID);
		if (!db_audit) return null;
		joined_audit.audit = db_audit;

		// setting joined_audit.checklist
		const checklist = await db.checklists.get(
			joined_audit.audit.checklist_ID
		);
		if (!checklist) return null;
		joined_audit.checklist = checklist;

		// setting joined_audit.issues
		const issue_IDs: number[] = joined_audit.audit.issue_IDs;

		const issues: Issues[] = await db.issues
			.where("id")
			.anyOf(issue_IDs)
			.toArray();

		joined_audit.issues = [];

		for (const issue of issues) {
			const [rule, page, page_state] = await Promise.all([
				db.rules.where("rule_ID").equals(issue.rule_ID).first(),
				db.pages.where("id").equals(issue.page_ID).first(),
				db.page_states.where("id").equals(issue.page_state_ID).first(),
			]);

			const issue_content: IssueContent = {} as IssueContent;
			issue_content.issue = issue;

			if (!rule || !page || !page_state) return null;
			issue_content.rule = rule;
			issue_content.page = page;
			issue_content.page_state = page_state;

			joined_audit.issues.push(issue_content);
		}

		return joined_audit;
	}, [audit_ID]);
	*/

	const audit = useJoinedAudit(audit_ID);

	if (!audit) return null;

	return (
		<table>
			<thead>
				<tr>
					<th id="issue-description">Issue Description</th>
					<th>Issue Status</th>
					<th>Rule Description</th>
					<th>Accessibility Requirements</th>
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
					<td>{issue_content.rule.name}</td>
					<td>{issue_content.rule.accessibility_requirements}</td>
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
				<option value={status.value}>{status.text}</option>
			))}
		</select>
	);
}
