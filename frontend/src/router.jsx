import {
	createBrowserRouter,
	redirect,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import Layout from "./components/layout";
import LoginForm from "./pages/login";
import DashBoard from "./pages/dashboard";
import Operations from "./pages/operations";
import Devices from "./pages/devices";
import Listeners from "./pages/listeners";
import Stagers from "./pages/stagers";
import Loaders from "./pages/loaders";
import Modules from "./pages/modules";
import Users from "./pages/users";
import Credentials from "./pages/credentials";
import Logs from "./pages/logs";
import Bypasses from "./pages/bypasses";
import Settings from "./pages/settings";

// create routes with layout and redirect index to dashboard
const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path="/login" element={<LoginForm />} />,
		<Route element={<Layout />}>
			<Route path="/" loader={() => redirect("/dashboard")} />
			<Route path="/dashboard" element={<DashBoard />} />,
			<Route path="/operations" element={<Operations />} />,
			<Route path="/devices" element={<Devices />} />,
			<Route path="/listeners" element={<Listeners />} />,
			<Route path="/stagers" element={<Stagers />} />,
			<Route path="/loaders" element={<Loaders />} />,
			<Route path="/modules" element={<Modules />} />,
			<Route path="/users" element={<Users />} />,
			<Route path="/credentials" element={<Credentials />} />,
			<Route path="/logs" element={<Logs />} />,
			<Route path="/bypasses" element={<Bypasses />} />,
			<Route path="/settings" element={<Settings />} />,
		</Route>,
	])
);

export default router;
