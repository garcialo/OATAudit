const current = getWellFormedParams();

(async()=>{

    try {

        //
        //  Getting data for current audit
        //
        const audit = await db.audits.get(current["audit_ID"]);
        console.log("audit");
        console.log(audit);
        
        const pages_array = await db.pages.where("id").anyOf(audit.page_IDs).toArray();
        console.log("pages_array");
        console.log(pages_array);
        
        // building array of page states ID from page array to make code for creating page_states_array more consistent with the creation of other arrays/objects
        let page_state_IDs = [];
        for (let i = 0; i < pages_array.length; i++) {
            page_state_IDs = page_state_IDs.concat(pages_array[i].page_state_IDs);
        }

        const page_states_array = await db.page_states.where("id").anyOf(page_state_IDs).toArray();
        console.log("page_states_array");
        console.log(page_states_array);

        const issues_array = await db.issues.where("id").anyOf(audit.issue_IDs).toArray();
        console.log("issues_array");
        console.log(issues_array);

        const checklist = await db.checklists.get(audit.checklist_ID);
        console.log("checklist");
        console.log(checklist);
        
        const rules_array = await db.rules.where("id").anyOf(checklist.rule_IDs).toArray();
        console.log("rules_array");
        console.log(rules_array);

        //
        // Build pages and issues sections
        //
        buildPagesAndPageStates(pages_array,page_states_array);
        buildIssuesTable(issues_array,rules_array);

    } catch (error) {
    console.log(error);
    }

})()

function getWellFormedParams() {
    const given_params = new URLSearchParams(document.location.search);
    const future_current = [];

    given_audit_ID = parseInt(given_params.get("audit_ID"));
    given_checklist_ID = parseInt(given_params.get("checklist_ID"));
    given_page_ID = parseInt(given_params.get("page_ID"));
    given_page_state_ID = parseInt(given_params.get("page_state_ID"));
    num_params = given_params.size;

    if (given_audit_ID < 0 || given_checklist_ID < 0 || given_page_ID < 0 || given_page_state_ID < 0) {
        // ID values will never be negative
        alert("Parameters are malformed. Redirect to error page.");
    } else if (
            !(
                (num_params == 1 && given_checklist_ID) || 
                (num_params == 1 && given_audit_ID) ||
                (num_params == 2 && (given_audit_ID && given_page_ID)) ||
                (num_params == 2 && (given_audit_ID && given_page_state_ID))
            )
        ) {
        // OAT Audit should only create the following URL parameter patterns
        // checklist only - creating a new audit
        // audit only - load specified audit; display issues for all page states for all pages
        // audit and page - load specified audit; display issues for all page states for specified page
        // audit and page state - load specified audit; display issues for specified page state
        alert("Unexpected parameter configuration. Redirect to error page for options.")
    } else
    {
        if(given_audit_ID) future_current["audit_ID"] = given_audit_ID;
        if(given_checklist_ID) future_current["checklist_ID"] = given_checklist_ID;
        if(given_page_ID) future_current["page_ID"] = given_page_ID;
        if(given_page_state_ID) future_current["page_state_ID"] = given_page_state_ID;
    }

    return future_current;
}

function buildPagesAndPageStates(page_array,page_state_array) {
    let template_h2 = document.getElementById("pages");

    for (let i = page_array.length - 1; i >= 0; i--) {
        let page_h3 = document.createElement("h3");
        let page_button = document.createElement("button");

        template_h2.insertAdjacentElement("afterend",page_h3);
        page_h3.appendChild(page_button);
        page_button.innerHTML = page_array[i].name;

        
        let page_state_list = document.createElement("ul");
        page_h3.insertAdjacentElement("afterend",page_state_list);

        for(let j = 0; j < page_state_array.length; j++) {
            if (page_array[i].id == page_state_array[j].page_ID) {
                let page_state_li = document.createElement("li");
                let page_state_button = document.createElement("button");

                page_state_list.appendChild(page_state_li);
                page_state_li.appendChild(page_state_button);
                page_state_button.innerHTML = page_state_array[j].name;
            }
        }
        
    }

    const all_pages_button = document.createElement("button");
    all_pages_button.innerHTML = "All Pages";
    template_h2.insertAdjacentElement("afterend",all_pages_button);
}

 function buildIssuesTable(issue_array,rule_array) {
    let template_tbody = document.getElementById("issues_table_body");

    for (let i = 0; i < issue_array.length; i++) {
        const issue_row = document.createElement("tr");
        const issue_description_cell = document.createElement("td");
            const issue_description_textarea = document.createElement("textarea");
            const issue_description_edit_save_button = document.createElement("button");
        const issue_status_cell = document.createElement("td");
        const rule_description_cell = document.createElement("td");
        
        const issue_details_th_ID = "issue_description_th";
        const rule_description_td_ID = "rule_description-"; // will change this once I figure out multiple instances of issues

        issue_description_textarea.setAttribute("aria-labelledby",issue_details_th_ID);
        issue_description_textarea.setAttribute("readonly","");
        issue_description_textarea.setAttribute("name",issue_array[i].id);
        
        if (issue_array[i].description) {
            issue_description_textarea.innerHTML = issue_array[i].description;
        }
        else {
            issue_description_textarea.innerHTML = "";
        }        
        issue_description_edit_save_button.innerHTML = "Edit Details";
        issue_description_edit_save_button.setAttribute("aria-describedby",rule_description_td_ID);

        issue_status_cell.innerHTML = issue_array[i].status;

        let current_rule_ID = issue_array[i].rule_ID;
        for (let j = 0; j < rule_array.length; j++) {
            if (current_rule_ID == rule_array[j].id) {
                rule_description_cell.innerHTML = rule_array[j].description;
            }
        }

        issue_description_cell.appendChild(issue_description_textarea);
        issue_description_cell.appendChild(issue_description_edit_save_button);
        issue_row.appendChild(issue_description_cell);
        issue_row.appendChild(issue_status_cell);
        issue_row.appendChild(rule_description_cell);
        
        template_tbody.appendChild(issue_row);
    }
 }