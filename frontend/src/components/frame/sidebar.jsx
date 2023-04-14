import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export const icons = {
  dashboard: "dashboard",
  operations: "public",
  devices: "dns",
  listeners: "earbuds",
  stagers: "code",
  loaders: "download",
  modules: "extension",
  users: "group",
  credentials: "vpn_key",
  logs: "event_note",
  auth: "lock",
};

function NavItem(props) {
  const text = props.text;
  const route = props.route;
  const lowerCaseText = text.toLowerCase();
  // set status to "active" if the current path is the same as the route
  const status = useLocation().pathname === route ? "active" : "";
  return (
    <li className={"nav-item " + status}>
      <Link className="nav-link" to={route}>
        <i className="material-icons">{icons[lowerCaseText]}</i>
        <p>{text}</p>
      </Link>
    </li>
  );
}

export default function SideBar() {
  const routes = {
    Dashboard: "/",
    Operations: "/operations",
    Devices: "/devices",
    Listeners: "/listeners",
    Stagers: "/stagers",
    Loaders: "/loaders",
    Modules: "/modules",
    Users: "/users",
    Credentials: "/credentials",
    Logs: "/logs",
  };
  return (
    <div
      className="sidebar"
      data-color="orange"
      data-background-color="black"
      data-image="icon.png"
    >
      <div className="logo">
        <a href="/" className="simple-text logo-normal">
          PhoenixC2
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {Object.keys(routes).map((route) => (
            <NavItem key={routes[route]} text={route} route={routes[route]} />
          ))}
        </ul>
      </div>
    </div>
  );
}
