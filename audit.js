let current_audit_ID = -1;
let current_checklist_ID = -1;
let current_page_state_ID = -1;

getParams();

(async()=>{

    try {

        //
        //  Getting data for current audit
        //
        const audit = await db.audits.get(current_audit_ID); // can't toArray this; look into it later
        console.log(audit);
        
        const pages_array = await db.pages.where("id").anyOf(audit.page_IDs).toArray();
        console.log(pages_array);
        
        // building array of page states ID from page array to make creating page_states_array more consistent with the creation of other arrays/objects
        let page_state_IDs = [];
        for (let i = 0; i < pages_array.length; i++) {
            page_state_IDs = page_state_IDs.concat(pages_array[i].page_state_IDs);
        }

        const page_states_array = await db.page_states.where("id").anyOf(page_state_IDs).toArray();
        console.log(page_states_array);

        // const checklist = 
        // const rules = 

        //
        // Build pages section
        //
        buildPagesAndPageStates(pages_array,page_states_array)


    } catch (error) {
    console.log(error);
    }

})()

function getParams() {
    let params = new URLSearchParams(document.location.search);
    current_audit_ID = parseInt(params.get("audit_ID"));
    current_checklist_ID = parseInt(params.get("checklist_ID"));
    current_page_state_ID = parseInt(params.get("page_state_ID"));
}

function buildPagesAndPageStates(page_array,page_state_array) {
    let template_h2 = document.getElementById("pages");

    for (i = page_array.length - 1; i >= 0; i--) {
        let new_page_h3 = document.createElement("h3");
        let new_page_button = document.createElement("button");

        template_h2.insertAdjacentElement("afterend",new_page_h3);
        new_page_h3.appendChild(new_page_button);
        new_page_button.innerHTML = page_array[i].name;

        let new_page_state_list = document.createElement("ul");

        // magic that creates list items and add them as children of the ul
    }
}

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
*/

