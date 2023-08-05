import { useLiveQuery } from "dexie-react-hooks";
import {
	JoinedAudit,
	JoinedPage,
	Issue,
	IssueContent,
} from "../components/interfaces";
import { db } from "../db";

export default function useJoinedAudit(audit_ID: number) {
	const audit = useLiveQuery(async () => {
		const joined_audit: JoinedAudit = {} as JoinedAudit;

		// setting joined_audit.audit
		const db_audit = await db.audits.get(audit_ID);
		if (!db_audit) return null;
		//joined_audit.audit = db_audit; // probably don't need to do this anymore

		// setting joined_audit.name
		if (db_audit.id) joined_audit.id = db_audit.id;

		// setting joined_audit.name
		joined_audit.name = db_audit.name;

		// setting joined_audit.checklist
		const checklist = await db.checklists.get(db_audit.checklist_ID);
		if (!checklist) return null;
		joined_audit.checklist = checklist;

		// setting joined_audit.pages
		const pages = await db.pages
			.where("id")
			.anyOf(db_audit.page_IDs)
			.toArray();

		joined_audit.pages = [];

		/*
id?: number;
	name: string;
	page_state_IDs: number[];
	url: string;
*/

		for (const page of pages) {
			const joined_page: JoinedPage = {} as JoinedPage;
			joined_page.id = page.id;
			joined_page.name = page.name;
			joined_page.url = page.url;

			const page_states = await db.page_states
				.where("page_ID")
				.equals(page.id)
				.toArray();

			joined_page.page_states = page_states;

			joined_audit.pages.push(joined_page);
		}

		// setting joined_audit.issues
		const issues: Issue[] = await db.issues
			.where("id")
			.anyOf(db_audit.issue_IDs)
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

	return audit;
}
