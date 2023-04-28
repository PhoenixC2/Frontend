import { createBrowserRouter } from "react-router-dom";
import MainFrame from "./components/mainframe";
import LoginForm from "./pages/login";
import DashBoard from "./pages/dashboard";
import Operations from "./pages/operations/page";
import Devices from "./pages/devices/page";
import Listeners from "./pages/listeners/page";
import Stagers from "./pages/stagers/page";
import Loaders from "./pages/loaders";
import Modules from "./pages/modules";
import Users from "./pages/users/page";
import Credentials from "./pages/credentials";
import Logs from "./pages/logs";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <MainFrame body={<DashBoard />} />,
  },
  {
    path: "/dashboard",
    element: <MainFrame body={<DashBoard />} />,
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
]);
export default router;
