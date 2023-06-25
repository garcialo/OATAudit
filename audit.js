const current = getWellFormedParams();

/*
Sets up the page into one of four states
    1. IF Checklist provided == "New Audit" state
        if checklist invalid, send to error page
    2. Else if Audit provided == "Continue Audit" state and set view to "all pages"
        if audit invalid, send to error page
    3. If Page provided == "Continue Audit" state
        if get results for provided page, change view to "this page"
    4. Else if page state provided
        if get results for provided page state, change view to "this page state"
*/
if (current["checklist_ID"]) {
    alert("New Audit!");
}
else if (current["audit_ID"]) {
    let alert_string = "Continuing Audit";
    
    (async()=>{

        try {
            //
            //  Getting data for current audit
            //
            const audit = await db.audits.get(current["audit_ID"]);          
            const checklist = await db.checklists.get(audit.checklist_ID);
            const rules_array = await db.rules.where("id").anyOf(checklist.rule_IDs).toArray();
            const issues_array = await db.issues.where("id").anyOf(audit.issue_IDs).toArray();
            const pages_array = await db.pages.where("id").anyOf(audit.page_IDs).toArray();
            
            // building array of page states ID from pages_array to make code for creating page_states_array more consistent with the creation of other arrays/objects
            let page_state_IDs = [];
            for (let i = 0; i < pages_array.length; i++) {
                page_state_IDs = page_state_IDs.concat(pages_array[i].page_state_IDs);
            }
            const page_states_array = await db.page_states.where("id").anyOf(page_state_IDs).toArray();
            

            //
            // Build pages and issues sections
            //
            buildPagesAndPageStates(pages_array,page_states_array);

            issues_heading_element = document.getElementById("issues");

            buildIssuesTable(issues_array,rules_array,pages_array,page_states_array,issues_heading_element);
            //buildIssuesCards(issues_array,rules_array,pages_array,page_states_array,issues_heading_element);

        } catch (error) {
        console.log(error);
        }

    })()

    if (current["page_ID"]) {
        alert_string += " and loading Page";
    } else if (current["page_state_ID"]) {
        alert_string += " and loading Page State";
    }

    alert(alert_string);
}
else {
    alert("This shouldn't happen.");
}

//
// Functions
//

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

function buildIssuesTable(issue_array,rule_array,page_array,page_state_array,parent_element) {
    // Currently always builds an "All Issues" table
    // Page and Page State buttons will just hide columns/cells that are out of scope instead of having to rebuild the table every time
    
    // Creating elements
    const table_element = document.createElement("table");
        const table_caption = document.createElement("caption");
        const thead_element = buildIssuesTHead();
        const tbody_element = buildIssuesTBody(issue_array,rule_array,page_array,page_state_array);

    // Setting attributes
    table_caption.setAttribute("id","table_caption");

    // Setting innerHTML
    table_caption.innerHTML = "All Issues";

    // Appending elements
    
    table_element.appendChild(table_caption);
    table_element.appendChild(thead_element);
    table_element.appendChild(tbody_element);

    parent_element.insertAdjacentElement("afterend",table_element);
}

function buildIssuesTHead() {
    // Creating elements
    const thead = document.createElement("thead");
    const header_row = document.createElement("tr");
    const issue_details_header = document.createElement("th");
    const issue_status_header = document.createElement("th");
    const rule_description_header = document.createElement("th");
    const a11y_requirements_header = document.createElement("th");
    const page_state_name_header = document.createElement("th");
    const page_name_header = document.createElement("th");
    const issue_id_header = document.createElement("th");
    const rule_id_header = document.createElement("th");
    const rule_name_header = document.createElement("th");

    // Setting attributes
    issue_details_header.setAttribute("id","issue_details_th");

    // Setting innerHTMLs
    issue_details_header.innerHTML = "Issue Details";
    issue_status_header.innerHTML = "Issue Status";
    rule_description_header.innerHTML = "Check/Rule Description";
    a11y_requirements_header.innerHTML = "Required By";
    page_state_name_header.innerHTML = "Page State Name";
    page_name_header.innerHTML = "Page Name";
    issue_id_header.innerHTML = "Issue ID";
    rule_id_header.innerHTML = "Rule ID";
    rule_name_header.innerHTML = "Rule Name";

    // Appending elements
    header_row.appendChild(issue_details_header);
    header_row.appendChild(issue_status_header);
    header_row.appendChild(rule_description_header);
    header_row.appendChild(a11y_requirements_header);
    header_row.appendChild(page_state_name_header);
    header_row.appendChild(page_name_header);
    header_row.appendChild(issue_id_header);
    header_row.appendChild(rule_id_header);
    header_row.appendChild(rule_name_header);

    thead.appendChild(header_row);
    return thead;
}

 function buildIssuesTBody(issue_array,rule_array,page_array,page_state_array) {
    const tbody = document.createElement("tbody");

    for (let i = 0; i < issue_array.length; i++) {
        // Creating elements
        const issue_row = document.createElement("tr");
        const issue_details_cell = document.createElement("td");
            const issue_details_textarea = document.createElement("textarea");
        const issue_status_cell = document.createElement("td");
        const rule_description_cell = document.createElement("td");
        const a11y_requirements_cell = document.createElement("td");
        const page_state_name_cell = document.createElement("td");
        const page_name_cell = document.createElement("td");
        const issue_id_cell = document.createElement("td");
        const rule_id_cell = document.createElement("td");
        const rule_name_cell = document.createElement("td");

        // Setting attributes
        const issue_details_th_ID = "issue_details_th";
        const rule_description_td_ID = "rule_description-"; // will change this once I figure out multiple instances of issues

        issue_details_textarea.setAttribute("aria-labelledby",issue_details_th_ID);
        issue_details_textarea.setAttribute("readonly","");
        issue_details_textarea.setAttribute("name",issue_array[i].id);

        // Setting innerHTMLs
        if (issue_array[i].description) {
            issue_details_textarea.innerHTML = issue_array[i].description;
        }
        else {
            issue_details_textarea.innerHTML = "";
        }

        issue_status_cell.innerHTML = issue_array[i].status;
        issue_id_cell.innerHTML = issue_array[i].id;

        let current_rule_ID = issue_array[i].rule_ID;
        for (let j = 0; j < rule_array.length; j++) {
            if (current_rule_ID == rule_array[j].id) {
                rule_description_cell.innerHTML = rule_array[j].description;
                a11y_requirements_cell.innerHTML = rule_array[j].accessibility_requirements.toString();
                rule_id_cell.innerHTML = rule_array[j].id;
                rule_name_cell.innerHTML = rule_array[j].rule_name; // rule table is named differently
            }
        }

        let current_page_state_ID = issue_array[i].page_state_ID;
        for (let j = 0; j < page_state_array.length; j++) {
            if (current_page_state_ID == page_state_array[j].id) {
                page_state_name_cell.innerHTML = page_state_array[j].name;
            }
        }

        let current_page_ID = issue_array[i].page_ID;
        for (let j = 0; j < page_array.length; j++) {
            if (current_page_ID == page_array[j].id) {
                page_name_cell.innerHTML = page_array[j].name;
            }
        }

        // Appending elements
        issue_details_cell.appendChild(issue_details_textarea);
        issue_row.appendChild(issue_details_cell);
        issue_row.appendChild(issue_status_cell);
        issue_row.appendChild(rule_description_cell);
        issue_row.appendChild(a11y_requirements_cell);
        issue_row.appendChild(page_state_name_cell);
        issue_row.appendChild(page_name_cell);
        issue_row.appendChild(issue_id_cell);
        issue_row.appendChild(rule_id_cell);
        issue_row.appendChild(rule_name_cell);
        
        tbody.appendChild(issue_row);
    }

    return tbody;
}