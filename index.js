async function populateAuditList() {
    await db.audits.each(audit_item => {
        appendToAuditList(audit_item.id,audit_item.name);
    });
}

populateAuditList();

/*
    builds "all_rulesets[]" from _data/rulesets
    traverse all_rulesets and append <option> elements to the <select id="rulesets"
*/
test_ruleset = {
    "name": "One rule ruleset",
    "description": "Single rule ruleset for proof-of-concept testing purposes.",
    "rules": [
        "test-1000"
    ]
};

test2_ruleset = {
    "name": "Another ruleset",
    "description": "Single rule ruleset for proof-of-concept testing purposes.",
    "rules": [
        "test-1000"
    ]
}

const all_rulesets = [test_ruleset,test2_ruleset];

// assuming test data above gets built was _date/rulesets

const ruleset_select_element = document.getElementById("ruleset");

for (let i = 0; i < all_rulesets.length; i++) {
    // given ruleset.name = "The Value"
    // output <option value"the_value">The Value</option>
    let value_text = toLowerSnakeCase(all_rulesets[i].name);

    let new_option = document.createElement('option');
    new_option.setAttribute("value",value_text);
    new_option.innerHTML = all_rulesets[i].name;

    ruleset_select_element.appendChild(new_option);
}

function toLowerSnakeCase(some_text) {
    some_text = some_text.replace(/ /g,"_").toLowerCase();
    return some_text;
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