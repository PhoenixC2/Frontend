import { createBrowserRouter } from "react-router-dom";
import MainFrame from "./components/mainframe";
import DashBoard from "./pages/dashboard";
import LoginForm from "./components/login";
import Listeners from "./pages/listeners";
const router = createBrowserRouter([
    {
      path: "/",
      element: <MainFrame body={<DashBoard />} />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/listeners",
      element: <MainFrame body={<Listeners />} />,
    },
  ]
);
export default router;