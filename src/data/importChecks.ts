// The export below all the imports is...
/*
	export const all_checks: Check[] = [
		oat0001,
		oat0002,
		...
	];
*/
// Putting the checks into the DB is done by /db/db.ts
//
// Now back to importing all of the rules in /src/data/rules
import { Check } from "../interfaces";
import { oat0001 } from "./checks/oat0001";

export const all_checks: Check[] = [oat0001];
