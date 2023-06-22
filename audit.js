let new_audit_name = "";
let current_audit_ID = -1;
let current_checklist_ID = -1;
let current_page_ID = -1;
let current_page_state_ID = -1;

getParams();

(async()=>{

    try {

        //
        //  Getting data for current audit
        //
        const audit = await db.audits.get(current_audit_ID); // can't toArray this; look into it later
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

function getParams() {
    let params = new URLSearchParams(document.location.search);
    current_audit_name = params.get("audit_name");
    current_audit_ID = parseInt(params.get("audit_ID"));
    current_checklist_ID = parseInt(params.get("checklist_ID"));
    current_page_ID = parseInt(params.get("page_ID"));
    current_page_state_ID = parseInt(params.get("page_state_ID"));
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