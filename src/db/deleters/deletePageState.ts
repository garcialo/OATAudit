export async function deletePageState(given_page_state_ID: number) {
	console.log("Deleting " + given_page_state_ID);
}

export async function bulkDeletePageStates(given_page_state_IDs: number[]) {
	console.log("Bulk Deleting " + given_page_state_IDs);
}
