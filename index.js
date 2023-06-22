populateAuditList();
populateChecklistOptions();

async function populateAuditList() {
    try {
        await db.audits.each(audit_item => {
            appendToAuditList(audit_item.id,audit_item.name);
        });
    } catch (error) {
        console.log(error);
    }
}

async function populateChecklistOptions() {
    try {
        await db.checklists.each(checklist_item => {
        appendToSelectOptions(checklist_item.id,checklist_item.name);
        });
    } catch (error) {
    console.log(error);
    }
}

function appendToAuditList(text_audit_ID,text_audit_name){
    let new_li = document.createElement("li");
    let new_url = document.createElement("a");
    let url_text = "audit.html?audit_ID=" + text_audit_ID;
    
    new_url.setAttribute("href",url_text);
    new_url.innerHTML = text_audit_name;

    new_li.appendChild(new_url);
    document.getElementById("continue_audit_list").appendChild(new_li);
}

function appendToSelectOptions(text_checklist_ID,text_checklist_name){
    let new_option = document.createElement('option');
    new_option.setAttribute("value",text_checklist_ID);
    new_option.innerHTML = text_checklist_name;

    document.getElementById("checklist").appendChild(new_option);
}