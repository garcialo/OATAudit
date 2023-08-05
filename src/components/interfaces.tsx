// Joined Interfaces
export interface JoinedAudit {
	id: number;
	name: string;
	//audit: Audit;
	checklist: Checklists;
	issues: IssueContent[];
}

export interface IssueContent {
	issue: Issues;
	rule: Rules;
	page: Pages;
	page_state: Page_states;
}

// DB Interfaces
// All indexed variables are required, but not all required values are indexed
export interface Audit {
	id?: number;
	name: string;
	checklist_ID: number;
	page_IDs: number[];
	issue_IDs: number[];
}

export interface Issues {
	id?: number;
	rule_ID: string;
	status: string;
	page_state_ID: number;
	page_ID: number;
	issue_number?: number;
	description?: string;
}

export interface Pages {
	id?: number;
	name: string;
	page_state_IDs: number[];
	url: string;
}

export interface Page_states {
	id?: number;
	name: string;
	page_ID?: number;
	instructions?: string;
}

export interface Checklists {
	id: number;
	name: string;
	rule_IDs: string[];
}

export interface Rules {
	id: number; // OATAudit Issue ID
	rule_ID: string; // maps to ACT Issue ID
	name: string;
	description: string;
	accessibility_requirements?: string[];
	//rule_type
	//input_aspects
	//input_rules
	//acknowledgements
}
