import { Form } from "react-router-dom";
import { useId } from "react";
import ChecklistOptions from "./ChecklistOptions";

export default function FormSelectChecklist({
	actionValue,
	submitButtonText,
}: {
	actionValue: string;
	submitButtonText: string;
}) {
	const selectID = useId();

	return (
		<Form action={actionValue}>
			<label htmlFor={selectID}>Choose a checklist</label>
			<select id={selectID} name="checklist_ID">
				<ChecklistOptions />
			</select>

			<input type="submit" value={submitButtonText} />
		</Form>
	);
}
