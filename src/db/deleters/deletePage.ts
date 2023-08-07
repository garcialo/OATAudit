export async function deletePage(given_page_ID: number) {
	console.log("Deleting " + given_page_ID);
}

export async function bulkDeletePages(given_page_IDs: number[]) {
	console.log("Bulk Deleting " + given_page_IDs);
}
