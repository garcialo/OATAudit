import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

export default function ChecklistOptions() {
	try {
		const checklists = useLiveQuery(() => db.checklists.toArray());

		return (
			<>
				{checklists?.map((checklist) => (
					<option key={checklist.id} value={checklist.id}>
						{checklist.name}
					</option>
				))}
			</>
		);
	} catch (error) {
		console.error("Could not load Audits", error);
	}
}
