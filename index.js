// this runs after the page loads
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

let all_rulesets = [test_ruleset,test2_ruleset];

// assuming test data above gets built was _date/rulesets

let ruleset_select_element = document.getElementById("ruleset");

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