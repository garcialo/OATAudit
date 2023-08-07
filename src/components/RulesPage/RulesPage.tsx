/* eslint-disable react-refresh/only-export-components */
import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import FormSelectChecklist from "../FormSelectChecklist/FormSelectChecklist";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import setPageTitle from "../../setPageTitle";

export async function rulesLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const checklist_ID = Number(url.searchParams.get("checklist_ID"));

	return { given_checklist_ID: checklist_ID };
}

export default function RulesPage() {
	setPageTitle("Rules - OAT Audit");

	const { given_checklist_ID } = useLoaderData() as {
		given_checklist_ID: number;
	};

	return (
		<main>
			<h1>Rules</h1>
			<FormSelectChecklist
				actionValue="/rules"
				submitButtonText="Select Checklist"
			/>

			<table>
				<thead>
					<tr>
						<th>Rule ID</th>
						<th>Rule Name</th>
						<th>Rule Description</th>
						<th>Accessibility Requirements</th>
					</tr>
				</thead>
				<tbody>
					{given_checklist_ID ? (
						<ChecklistRules checklist_ID={given_checklist_ID} />
					) : (
						<AllRules />
					)}
				</tbody>
			</table>
		</main>
	);
}

function ChecklistRules({ checklist_ID }: { checklist_ID: number }) {
	const checklist = useLiveQuery(async () => {
		const db_checklist = await db.checklists.get(checklist_ID);

		return db_checklist;
	}, [checklist_ID]);

	if (!checklist) return null;

	return (
		<>
			<RuleRows rule_IDs={checklist.rule_IDs} />
		</>
	);
}

function RuleRows({ rule_IDs }: { rule_IDs: string[] }) {
	const rules = useLiveQuery(async () => {
		const db_rules = await db.rules
			.where("rule_ID")
			.anyOf(rule_IDs)
			.toArray();

		return db_rules;
	}, [rule_IDs]);

	if (!rules) return null;

	return (
		<>
			{rules.map((rule) => (
				<tr key={rule.id}>
					<td>{rule.rule_ID}</td>
					<td>{rule.name}</td>
					<td>{rule.description}</td>
					<td>{rule.accessibility_requirements}</td>
				</tr>
			))}
		</>
	);
}

function AllRules() {
	const all_rules = useLiveQuery(() => db.rules.toArray());

	if (!all_rules) return null;

	return (
		<>
			{all_rules.map((rule) => (
				<tr key={rule.id}>
					<td>{rule.rule_ID}</td>
					<td>{rule.name}</td>
					<td>{rule.description}</td>
					<td>{rule.accessibility_requirements}</td>
				</tr>
			))}
		</>
	);
}
