import Dexie, { Table } from "dexie";
import {
	Audit,
	Issue,
	Page,
	Page_state,
	Checklist,
	Check,
} from "../interfaces";
import { all_checks } from "../data/importChecks";
import { all_checklists } from "../data/importChecklists";

export class AuditDB extends Dexie {
	audits!: Table<Audit>;
	issues!: Table<Issue>;
	pages!: Table<Page>;
	page_states!: Table<Page_state>;
	checklists!: Table<Checklist>;
	checks!: Table<Check>;

	constructor() {
		super("OAT Audit");
		this.version(1).stores({
			audits: "++id,name,checklist_ID,*page_IDs,*issue_IDs",
			issues: "++id,check_ID,status,page_state_ID,page_ID",
			pages: "++id,name,*page_state_IDs",
			page_states: "++id,name,page_ID",
			checklists: "++id,&name,*check_IDs",
			checks: "++id,check_ID,*checklist_IDs",
		});
	}
}

export const db = new AuditDB();
db.on("populate", async () => {
	db.audits.bulkPut([
		{
			id: 1,
			name: "Sample Audit",
			checklist_ID: 1,
			page_IDs: [1],
			issue_IDs: [1, 2, 3, 4],
		},
	]);

	db.checklists.bulkPut(all_checklists);

	db.issues.bulkPut([
		{
			id: 1,
			check_ID: "oat0001",
			status: "Pass",
			page_state_ID: 1,
			page_ID: 1,
		},
		{
			id: 2,
			check_ID: "oat0002",
			status: "Pass",
			page_state_ID: 1,
			page_ID: 1,
		},
		{
			id: 3,
			check_ID: "oat0001",
			status: "Fail",
			page_state_ID: 2,
			page_ID: 1,
			description: "Picture ()",
		},
		{
			id: 4,
			check_ID: "oat0002",
			status: "Fail",
			page_state_ID: 2,
			page_ID: 1,
			description:
				'Image link (<a href="homepage.html"<img src="home.png"></a>) missing text alternative',
		},
	]);

	db.page_states.bulkPut([
		{
			id: 1,
			name: "Initial",
			page_ID: 1,
		},
		{
			id: 2,
			name: "Sample Page State",
			page_ID: 1,
			instructions: "Click 'X' close button to hide the consent dialog",
		},
	]);

	db.pages.bulkPut([
		{
			id: 1,
			name: "Sample Page",
			url: "example.com",
			page_state_IDs: [1, 2],
		},
	]);

	db.checks.bulkPut(all_checks);
});
