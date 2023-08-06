import Dexie, { Table } from "dexie";
import {
	Audit,
	Issue,
	Page,
	Page_state,
	Checklist,
	Rule,
} from "./components/interfaces";

export class AuditDB extends Dexie {
	audits!: Table<Audit>;
	issues!: Table<Issue>;
	pages!: Table<Page>;
	page_states!: Table<Page_state>;
	checklists!: Table<Checklist>;
	rules!: Table<Rule>;

	constructor() {
		super("OAT Audit");
		this.version(1).stores({
			audits: "++id,name,checklist_ID,*page_IDs,*issue_IDs",
			issues: "++id,rule_ID,status,page_state_ID,page_ID",
			pages: "++id,name,*page_state_IDs",
			page_states: "++id,name,page_ID",
			checklists: "++id,&name,*rule_IDs",
			rules: "++id,rule_ID,rule_name,*accessibility_requirements",
		});
	}
}

export const db = new AuditDB();
db.on("populate", async () => {
	db.audits.bulkPut([
		{
			id: 30,
			name: "Example COM and ORG",
			checklist_ID: 301,
			page_IDs: [400, 401],
			issue_IDs: [201, 202, 203, 204, 205, 206, 207],
		},
		{
			id: 31,
			name: "Only example.com",
			checklist_ID: 301,
			page_IDs: [402],
			issue_IDs: [],
		},
	]);

	db.checklists.bulkPut([
		{ id: 300, rule_IDs: ["log-1000"], name: "One rule checklist" },
		{
			id: 301,
			rule_IDs: ["log-1000", "log-1001"],
			name: "Two rule checklist",
		},
		{ id: 1, rule_IDs: ["log-1001"], name: "Only 1001 - default" },
	]);

	db.issues.bulkPut([
		{
			id: 200,
			rule_ID: "log-1000",
			status: "Pass",
			page_state_ID: 100,
			page_ID: 400,
			issue_number: 1,
		},
		{
			id: 201,
			rule_ID: "log-1001",
			status: "Pass",
			page_state_ID: 100,
			page_ID: 400,
			issue_number: 2,
		},
		{
			id: 202,
			rule_ID: "log-1000",
			status: "Pass",
			page_state_ID: 101,
			page_ID: 400,
			issue_number: 3,
		},
		{
			id: 203,
			rule_ID: "log-1001",
			status: "Fail",
			page_state_ID: 101,
			page_ID: 400,
			description: "Example description for issue 203",
			issue_number: 4,
		},
		{
			id: 204,
			rule_ID: "log-1000",
			status: "Fail",
			page_state_ID: 102,
			page_ID: 401,
			description: "Example description for issue 204",
			issue_number: 5,
		},
		{
			id: 205,
			rule_ID: "log-1001",
			status: "Fail",
			page_state_ID: 102,
			page_ID: 401,
			description: "Example description for issue 205",
			issue_number: 6,
		},
		{
			id: 206,
			rule_ID: "log-1000",
			status: "Pass",
			page_state_ID: 103,
			page_ID: 401,
			issue_number: 7,
		},
		{
			id: 207,
			rule_ID: "log-1001",
			status: "Fail",
			page_state_ID: 103,
			page_ID: 401,
			description: "Example description for issue 207",
			issue_number: 8,
		},
	]);

	db.page_states.bulkPut([
		{ id: 100, name: "Initial", page_ID: 400 },
		{
			id: 101,
			name: "Fake Page",
			page_ID: 400,
			instructions: "Sample instructions for page 400",
		},
		{ id: 102, name: "Initial", page_ID: 401 },
		{
			id: 103,
			name: "Made up page",
			page_ID: 401,
			instructions: "Sample instructions for page 401",
		},
		{ id: 104, name: "Initial", page_ID: 402 },
	]);

	db.pages.bulkPut([
		{
			id: 400,
			name: "Homepage COM",
			url: "example.com",
			page_state_IDs: [100, 101],
		},
		{
			id: 401,
			name: "Homepage ORG",
			url: "example.org",
			page_state_IDs: [102, 103],
		},
		{
			id: 402,
			name: "Example COM Homepage",
			url: "example.com",
			page_state_IDs: [104],
		},
	]);

	db.rules.bulkPut([
		{
			id: 1,
			rule_ID: "log-1000",
			name: "Title is not empty",
			description: "The title element has innerHTML",
			accessibility_requirements: ["WCAG 2.0", "WCAG 2.1", "WCAG 2.2"],
		},
		{
			id: 2,
			rule_ID: "log-1001",
			name: "Title is descriptive",
			description:
				"The title element innerHTML describes the page content",
			accessibility_requirements: ["WCAG 2.0", "WCAG 2.1", "WCAG 2.2"],
		},
	]);
});
