var db = new Dexie("OAT_Audit_DB");

db.version(1).stores({
audits: 'id,name,checklist_ID,*page_IDs,*issue_IDs',
issues: 'id,rule_ID,status,page_state_ID,page_ID',
pages: 'id,name,*page_state_IDs',
page_states: 'id,name,page_ID',
checklists: 'id,&name,*rule_IDs',
rules: 'id,rule_name,*accessibility_requirements'
});

db.audits.bulkPut([
	{ id: 30, name: "Example COM and ORG", checklist_ID: 301, page_IDs: [400,401],issue_IDs: [201,202,203,204,205,206,207] },
	{ id: 31, name: "Only example.com", checklist_ID: 301, page_IDs: [402]}
]).catch(error => {
	showError(error);
});

db.checklists.bulkPut([
	{ id: 300, rule_IDs: ["log-1000"], name: "One rule checklist" },
	{ id: 301, rule_IDs: ["log-1000", "log-1001"], name: "Two rule checklist" }
]).catch(error => {
	showError(error);
});

db.issues.bulkPut([
	{ id: 200, rule_ID: "log-1000", status: "Pass", page_state_ID: 100, page_ID: 400},
	{ id: 201, rule_ID: "log-1001", status: "Pass", page_state_ID: 100, page_ID: 400},
	{ id: 202, rule_ID: "log-1000", status: "Pass", page_state_ID: 101, page_ID: 400},
	{ id: 203, rule_ID: "log-1001", status: "Fail", page_state_ID: 101, page_ID: 400, description: "Some bullshit"},
	{ id: 204, rule_ID: "log-1000", status: "Fail", page_state_ID: 102, page_ID: 401, description: "Title doesn't exist for the page"},
	{ id: 205, rule_ID: "log-1001", status: "Fail", page_state_ID: 102, page_ID: 401, description: "It's not even descriptive"},
	{ id: 206, rule_ID: "log-1000", status: "Pass", page_state_ID: 103, page_ID: 401},
	{ id: 207, rule_ID: "log-1001", status: "Fail", page_state_ID: 103, page_ID: 401, description: "Need even more fails."}
]).catch(error => {
	showError(error);
});

db.page_states.bulkPut([
	{ id: 100, name: "Initial", page_ID: 400},
	{ id: 101, name: "Fake Page", page_ID: 400, instructions: "Click the giant 'Fake' button"},
	{ id: 102, name: "Initial", page_ID: 401},
	{ id: 103, name: "Made up page", page_ID: 401, instructions: "Submit some form"},
	{ id: 104, name: "Initial", page_ID: 402}	  
]).catch(error => {
	showError(error);
});

db.pages.bulkPut([
	{ id: 400, name: "Homepage COM", url: "example.com", page_state_IDs: [100, 101] },
	{ id: 401, name: "Homepage ORG", url: "example.org", page_state_IDs: [102, 103] },
	{ id: 402, name: "Example COM Homepage", url: "example.com", page_state_IDs: [104] }
]).catch(error => {
	showError(error);
});

db.rules.bulkPut([
	{ id: "log-1000", rule_name: "Title is not empty", description: "The title element has innerHTML", accessibility_requirements: ["WCAG 2.0","WCAG 2.1", "WCAG 2.2"] },
	{ id: "log-1001", rule_name: "Title is descriptive", description: "The title element innerHTML describes the page content", accessibility_requirements: ["WCAG 2.0","WCAG 2.1", "WCAG 2.2"] }
]).catch(error => {
	showError(error);
});

function showError(error_text){
  alert("Error: " + error_text);
}