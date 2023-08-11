/* eslint-disable react-refresh/only-export-components */
import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import FormSelectChecklist from "../FormSelectChecklist/FormSelectChecklist";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import setPageTitle from "../../setPageTitle";

export async function checksLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const checklist_ID = Number(url.searchParams.get("checklist_ID"));

	return { given_checklist_ID: checklist_ID };
}

export default function ChecksPage() {
	setPageTitle("Checks - OAT Audit");

	const { given_checklist_ID } = useLoaderData() as {
		given_checklist_ID: number;
	};

	return (
		<main>
			<h1>Checks</h1>
			<FormSelectChecklist
				actionValue="/checks"
				submitButtonText="Select Checklist"
			/>

			<table>
				<thead>
					<tr>
						<th>Check ID</th>
						<th>Check Name</th>
						<th>Check Description</th>
					</tr>
				</thead>
				<tbody>
					{given_checklist_ID ? (
						<ChecklistChecks checklist_ID={given_checklist_ID} />
					) : (
						<AllChecks />
					)}
				</tbody>
			</table>
		</main>
	);
}

function ChecklistChecks({ checklist_ID }: { checklist_ID: number }) {
	const checklist = useLiveQuery(async () => {
		const db_checklist = await db.checklists.get(checklist_ID);

		return db_checklist;
	}, [checklist_ID]);

	if (!checklist) return null;

	return (
		<>
			<CheckRows check_IDs={checklist.check_IDs} />
		</>
	);
}

function CheckRows({ check_IDs }: { check_IDs: string[] }) {
	const checks = useLiveQuery(async () => {
		const db_checks = await db.checks
			.where("check_ID")
			.anyOf(check_IDs)
			.toArray();

		return db_checks;
	}, [check_IDs]);

	if (!checks) return null;

	return (
		<>
			{checks.map((check) => (
				<tr key={check.id}>
					<td>{check.check_ID}</td>
					<td>{check.name}</td>
					<td>{check.description}</td>
				</tr>
			))}
		</>
	);
}

function AllChecks() {
	const all_checks = useLiveQuery(() => db.checks.toArray());

	if (!all_checks) return null;

	return (
		<>
			{all_checks.map((check) => (
				<tr key={check.id}>
					<td>{check.check_ID}</td>
					<td>{check.name}</td>
					<td>{check.description}</td>
				</tr>
			))}
		</>
	);
}
