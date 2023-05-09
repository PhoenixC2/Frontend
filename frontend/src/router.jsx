import { createBrowserRouter, redirect } from "react-router-dom";
import MainFrame from "./components/mainframe";
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

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <MainFrame body={<DashBoard />} />,
  },
  {
    path: "/",
    loader : () => redirect("/dashboard"),
  },
  {
    path: "/operations",
    element: <MainFrame body={<Operations />} />,
  },
  {
    path: "/devices",
    element: <MainFrame body={<Devices />} />,
  },
  {
    path: "/listeners",
    element: <MainFrame body={<Listeners />} />,
  },
  {
    path: "/stagers",
    element: <MainFrame body={<Stagers />} />,
  },
  {
    path: "/loaders",
    element: <MainFrame body={<Loaders />} />,
  },
  {
    path: "/modules",
    element: <MainFrame body={<Modules />} />,
  },
  {
    path: "/users",
    element: <MainFrame body={<Users />} />,
  },
  {
    path: "/credentials",
    element: <MainFrame body={<Credentials />} />,
  },
  {
    path: "/logs",
    element: <MainFrame body={<Logs />} />,
  },
  {
    path: "/bypasses",
    element: <MainFrame body={<Bypasses />} />,
  },
]);
export default router;
