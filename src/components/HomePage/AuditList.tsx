import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import { Link } from "react-router-dom";

export default function AuditList() {
	try {
		const audits = useLiveQuery(() => db.audits.toArray());

		return (
			<>
				{audits?.map((audit) => (
					<li key={audit.id}>
						<Link to={"audit?audit_ID=" + audit.id}>
							{audit.name}
						</Link>
						{" - "}
						<Link to={"audit/settings?audit_ID=" + audit.id}>
							{"Settings - " + audit.name}
						</Link>
					</li>
				))}
			</>
		);
	} catch (error) {
		console.error("Could not load Audits", error);
	}
}
