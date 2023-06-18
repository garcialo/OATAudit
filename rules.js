const rules_table_body = document.getElementById("rules_table_body");
buildTable();

async function buildTable() {
    await db.rules.each(rule => {
        appendRuleRow(rule.id,rule.rule_name,rule.description,rule.accessibility_requirements);
    });
}

function appendRuleRow(id, name, desc, requirements_array) {
    let rule_row = document.createElement("tr");
    let id_cell = document.createElement("td");
    let name_cell = document.createElement("td");
    let desc_cell = document.createElement("td");
    let wcag20_cell = document.createElement("td");
    let wcag21_cell = document.createElement("td");
    let wcag22_cell = document.createElement("td");

    id_cell.innerHTML = id;
    name_cell.innerHTML = name;
    desc_cell.innerHTML = desc;

    if (requirements_array.includes("WCAG 2.0")) {
        wcag20_cell.innerHTML = "check";
    }
    else {
        wcag20_cell.innerHTML = "cross";
    }

    if (requirements_array.includes("WCAG 2.1")) {
        wcag21_cell.innerHTML = "check";
    }
    else {
        wcag21_cell.innerHTML = "cross";
    }

    if (requirements_array.includes("WCAG 2.2")) {
        wcag22_cell.innerHTML = "check";
    }
    else {
        wcag22_cell.innerHTML = "cross";
    }

    rule_row.appendChild(id_cell);
    rule_row.appendChild(name_cell);
    rule_row.appendChild(desc_cell);
    rule_row.appendChild(wcag20_cell);
    rule_row.appendChild(wcag21_cell);
    rule_row.appendChild(wcag22_cell);
    rules_table_body.appendChild(rule_row);
}