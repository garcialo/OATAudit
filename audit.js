/*

*/

// data above simulates content from IDB


let params = new URLSearchParams(document.location.search);
let audit_name = params.get("audit_name");
let ruleset = params.get("ruleset");

let heading_1 = "";

if (ruleset !== "") {
    heading_1.replace("Minimal",ruleset);
}

if (heading_1 !== "") {
    heading_1 = audit_name;
    document.getElementsByTagName('h1')[0].innerHTML = heading_1;
}