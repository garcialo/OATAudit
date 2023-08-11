// Joined Interfaces
export interface JoinedAudit {
	id: number;
	name: string;
	//audit: Audit;
	checklist: Checklist;
	pages: JoinedPage[];
	issues: IssueContent[];
}

export interface JoinedPage {
	id: number;
	name: string;
	url: string;
	page_states: Page_state[];
}

export interface IssueContent {
	issue: Issue;
	rule: Rule;
	page: Page;
	page_state: Page_state;
}

// DB Interfaces
export interface Audit {
	id?: number;
	name: string;
	checklist_ID: number;
	page_IDs: number[];
	issue_IDs: number[];
}

export interface Issue {
	id?: number;
	rule_ID: string;
	status: string;
	page_state_ID: number;
	page_ID: number;
	issue_number?: number;
	description?: string;
}

export interface Page {
	id?: number;
	name: string;
	page_state_IDs: number[];
	url: string;
}

export interface Page_state {
	id?: number;
	name: string;
	page_ID?: number;
	instructions?: string;
}

export interface Checklist {
	id?: number;
	name: string;
	check_IDs: string[];
}

export interface Check {
	id?: number; // internal app id
	check_ID: string; // external "check_ID" maybe will change to ACT composite rule ID?
	name?: string;
	description?: string;
	checklist_IDs: number[];
	rule_IDs?: number[]; // reference to specific ACT-formatted rules
}

export interface Rule {
	id: number; // OATAudit ID
	rule_ID: string; // maps to ACT Issue ID
	name: string;
	description: string;
	accessibility_requirements_IDs: number[];
}

interface AccessibilityRequirement {
	rule_ID: number;
	id: number;
	ruleset: string;
	ruleName: string;
	ruleNumber: string;
	ruleLevel?: string;
	forConformance: boolean;
	failed?: "not satisfied";
	passed?: string;
	inapplicable?: string;
}
