/* eslint-disable react-refresh/only-export-components */
import setPageTitle from "../../setPageTitle";
import { type LoaderFunctionArgs, useLoaderData, Link } from "react-router-dom";
import { JoinedAudit } from "../../interfaces";
import useJoinedAudit from "../../hooks/useJoinedAudit";
import PageAndStateNav from "./PageAndStateNav";
import IssueTable from "./IssueTable";

export async function auditLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const audit_ID = Number(url.searchParams.get("audit_ID"));
	const page_ID = Number(url.searchParams.get("page_ID"));
	const page_state_ID = Number(url.searchParams.get("page_state_ID"));

	return {
		given_audit_ID: audit_ID,
		given_page_ID: page_ID,
		given_page_state_ID: page_state_ID,
	};
}

export default function AuditPage() {
	setPageTitle("Audit - OAT Audit");

	const { given_audit_ID, given_page_ID, given_page_state_ID } =
		useLoaderData() as {
			given_audit_ID: number;
			given_page_ID: number;
			given_page_state_ID: number;
		};

	const audit = useJoinedAudit(given_audit_ID);

	if (!audit) return null;

	const paramsAreValid = validateUrlParams({
		given_page_ID: given_page_ID,
		given_page_state_ID: given_page_state_ID,
		joined_audit: audit,
	});

	// tried useState, but the rerender results in looping
	let view = "audit";
	let id = audit.id;

	if (given_page_state_ID && paramsAreValid) {
		view = "page_state";
		id = given_page_state_ID;
	} else if (given_page_ID && paramsAreValid) {
		view = "page";
		id = given_page_ID;
	}

	return (
		<main>
			<h1>{audit.name}</h1>
			<Link to={"/audit/settings?audit_ID=" + audit.id}>
				{"Audit Settings"}
			</Link>
			<PageAndStateNav pages={audit.pages} audit_ID={audit.id} />
			<h2>
				Issues - {view} - {id}
			</h2>
			<IssueTable issues={audit.issues} view={view} id={id} />
		</main>
	);
	/* Commenting out until actions exist
				<section aria-labelledby="actions">
					<h2 id="actions">Actions</h2>
					<p>Action Content</p>
				</section>
	*/
}

function validateUrlParams({
	given_page_ID,
	given_page_state_ID,
	joined_audit,
}: {
	given_page_ID: number;
	given_page_state_ID: number;
	joined_audit: JoinedAudit;
}) {
	let page_in_audit = false;
	let page_state_in_audit = false;

	for (const page of joined_audit.pages) {
		if (page.id === given_page_ID) {
			page_in_audit = true;
		}

		const page_state_array = page.page_states;
		for (const page_state of page_state_array) {
			if (page_state.id === given_page_state_ID) {
				page_state_in_audit = true;
			}
		}
	}

	if (given_page_state_ID && page_state_in_audit) {
		return true;
	} else if (given_page_ID && page_in_audit) {
		return true;
	}
	return false;
}
