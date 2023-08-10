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
	id: number;
	name: string;
	rule_IDs: string[];
}

export interface Rule {
	id: number; // OATAudit ID
	rule_ID: string; // maps to ACT Issue ID
	name: string;
	description: string;
	accessibility_requirements?: string[];
}

// data interfaces
enum rule_type {
	atomic = "atomic",
	composite = "composite",
}

interface AccessibilityRequirement {
	ruleset: string;
	ruleName: string;
	ruleNumber: string;
	forConformance: boolean;
	failed?: "not satisfied";
	passed?: string;
	inapplicable?: string;
}

export interface OatChecklist {
	name: string;
	check_IDs: string[];
}

export interface OatCheck {
	id: string;
	name: string;
	rule_type?: rule_type;
	description: string;
	accessibility_requirements?: AccessibilityRequirement[];
	acknowledgements?: {
		authors: string[];
		previous_authors?: string[];
	};
	background?: string[];
}
