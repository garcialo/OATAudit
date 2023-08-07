export async function deleteIssue(given_issue_ID: number) {
	console.log("Deleting " + given_issue_ID);
}

export async function bulkDeleteIssues(given_issue_IDs: number[]) {
	console.log("Bulk Deleting " + given_issue_IDs);
}
