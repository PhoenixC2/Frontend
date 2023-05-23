import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import queryClient from "./query";
import router from "./router";
import "./css/styles.css";
import "./scss/material-dashboard.scss";
import "@fontsource/roboto"; 
// allow toggling devtools in production builds

const ReactQueryDevtoolsProduction = React.lazy(() =>
	import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
		(d) => ({
			default: d.ReactQueryDevtools,
		})
	)
);

function App() {
	const [showDevtools, setShowDevtools] = React.useState(false);

	React.useEffect(() => {
		window.toggleDevtools = () => setShowDevtools((old) => !old);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}></RouterProvider>
			<ReactQueryDevtools initialIsOpen />
			{showDevtools && (
				<React.Suspense fallback={null}>
					<ReactQueryDevtoolsProduction initialIsOpen />
				</React.Suspense>
			)}
		</QueryClientProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
