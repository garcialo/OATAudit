import { JoinedPage } from "../../interfaces";
import { useSearchParams } from "react-router-dom";

export default function PageAndStateNav({
	pages,
	audit_ID,
}: {
	pages: JoinedPage[];
	audit_ID: number;
}) {
	const [, setUrlParams] = useSearchParams();

	const handleAll = () => {
		setUrlParams({ audit_ID: "" + audit_ID });
	};

	const handlePage = (page_ID: number) => {
		setUrlParams({ audit_ID: "" + audit_ID, page_ID: "" + page_ID });
	};

	const handlePageState = (page_state_ID: number) => {
		setUrlParams({
			audit_ID: "" + audit_ID,
			page_state_ID: "" + page_state_ID,
		});
	};

	return (
		<nav>
			<h2>Pages</h2>
			<button type="button" onClick={handleAll}>
				All Pages
			</button>
			{pages.map((page) => (
				<>
					<h3 key={page.id}>
						<button
							type="button"
							onClick={() => handlePage(page.id)}
						>
							{page.name} (id:{page.id})
						</button>
					</h3>
					<ul>
						{page.page_states.map((page_state) => (
							<li key={page_state.id}>
								<button
									type="button"
									onClick={() =>
										handlePageState(Number(page_state.id))
									}
								>
									{page_state.name} (id:{page_state.id})
								</button>
							</li>
						))}
					</ul>
				</>
			))}
		</nav>
	);
}
