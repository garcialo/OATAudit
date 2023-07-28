import {
	useNavigate,
	isRouteErrorResponse,
	useRouteError,
} from "react-router-dom";

const Error = () => {
	const navigate = useNavigate();
	const error = useRouteError() as Error;

	if (!isRouteErrorResponse(error)) {
		return null;
	}

	return (
		<>
			<h1>Something went wrong 😢</h1>
			<p>{error.data}</p>
			<button onClick={() => navigate(-1)}>&larr; Go back</button>
		</>
	);
};

export default Error;
