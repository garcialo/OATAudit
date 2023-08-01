import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";

import Header from "./components/Header.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";
import RulesPage, { rulesLoader } from "./components/RulesPage/RulesPage.tsx";
import AuditPage, { auditLoader } from "./components/AuditPage/AuditPage.tsx";
import AuditSettingsPage, {
	auditSettingsLoader,
} from "./components/AuditSettingsPage/AuditSettingsPage.tsx";

export function Root() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/rules",
				loader: rulesLoader,
				element: <RulesPage />,
			},
			{
				path: "/audit",
				loader: auditLoader,
				element: <AuditPage />,
			},
			{
				path: "/audit/settings",
				loader: auditSettingsLoader,
				element: <AuditSettingsPage />,
			},
		],
	},
]);

ReactDOM.createRoot(
	document.getElementById("i-hate-divs") as HTMLElement
).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);