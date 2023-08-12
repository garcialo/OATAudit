// Putting the checklists into the DB is done by /db/db.ts
import { Checklist } from "../interfaces";
import { oatMinimum } from "./checklists/oatMinimum";
import { oatWcag20 } from "./checklists/oatWcag20";
import { oatWcag21 } from "./checklists/oatWcag21";

export const all_checklists: Checklist[] = [oatMinimum, oatWcag20, oatWcag21];
