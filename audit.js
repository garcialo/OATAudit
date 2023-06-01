let params = new URLSearchParams(document.location.search);
let name = params.get("name");

heading_1 = "name";

document.getElementsByTagName('h1')[0].innerHTML = heading_1;