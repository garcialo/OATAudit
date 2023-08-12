// Putting the checklists into the DB is done by /db/db.ts
import { Checklist } from "../interfaces";
import { oatMinimum } from "./checklists/oatMinimum";

export const all_checklists: Checklist[] = [oatMinimum];
