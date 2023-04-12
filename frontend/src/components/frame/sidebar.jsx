import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const icons = {
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
  const route = props.route;
  const lowerCaseRoute = route.toLowerCase();
  const active = "active"
    ? useLocation().pathname === `/${lowerCaseRoute}`
    : "";
  return (
    <li className="nav-item {active}">
      <Link className="nav-link" to={`/${lowerCaseRoute}`}>
        <i className="material-icons">{icons[lowerCaseRoute]}</i>
        <p>{route}</p>
      </Link>
    </li>
  );
}

export default function SideBar() {
  const routes = [
    "Dashboard",
    "Operations",
    "Devices",
    "Listeners",
    "Stagers",
    "Loaders",
    "Modules",
    "Users",
    "Credentials",
    "Logs",
  ];
  return (
    <div
      className="sidebar"
      data-color="orange"
      data-background-color="black"
      data-image="/icon.png"
    >
      <div className="logo">
        <a href="/" className="simple-text logo-normal">
          PhoenixC2
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {routes.map((route) => (
            <NavItem key={route} route={route} />
          ))}
        </ul>
      </div>
    </div>
  );
}
