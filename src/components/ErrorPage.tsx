import {
	useNavigate,
	isRouteErrorResponse,
	useRouteError,
} from "react-router-dom";
import setPageTitle from "../setPageTitle";

const Error = () => {
	setPageTitle("Error Found - OAT Audit");
	const navigate = useNavigate();
	const error = useRouteError() as Error;

	if (!isRouteErrorResponse(error)) {
		return null;
	}

	return (
		<>
			<h1>Error found</h1>
			<p>
				Lost in the code's flow
				<br />
				Mistakes teach us as we grow
				<br />
				"404" found, yo
			</p>
			<h2>Error content</h2>
			<p>{error.data}</p>
			<button onClick={() => navigate(-1)}>Back</button>
		</>
	);
};

export default Error;
