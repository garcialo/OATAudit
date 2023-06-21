const current_audit_ID = -1;
const current_checklist_ID = -1;
const current_page_state_ID = -1;

function getParams() {
    let params = new URLSearchParams(document.location.search);
    current_audit_ID = parseInt(params.get("audit_ID"));
    current_checklist_ID = parseInt(params.get("checklist_ID"));
    current_page_state_ID = parseInt(params.get("page_state_ID"));
}

(async()=>{

    try {

    } catch (error) {
    console.log(error);
    }

})()

/*

Needed content for this page:
1. List of pages and lists of their page_states
-- audit_ID > audits.page_IDs > pages.name/pages.page_state_IDs > page_state_name

<h2 id="pages">Pages</h2>
<h3><button> page_name </button></h3> - expand/collapse showing page states
<ul><li> page_state_name </li></ul>



2. List of rules and list of issues
If audit doesn't have issue_IDs[], initialize one with issues.status = "Incomplete" for each rule
else 
Make the table
-- audit_ID > audits.issue_IDs > issues.description/issues.status/issues.rule_ID > rules.description

<tbody id="issues">
    <tr>
        <td> issue_description </td>
        <td> issue_status </td>
        <td> rule_description </td>
    </tr>
</tbody>