import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
	faDashboard,
	faServer,
	faWifi,
	faCode,
	faList,
	faDownload,
	faPuzzlePiece,
	faUsers,
	faKey,
	faListOl,
	faWandMagicSparkles,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const icons = {
	dashboard: faDashboard,
	operations: faList,
	devices: faServer,
	listeners: faWifi,
	stagers: faCode,
	loaders: faDownload,
	modules: faPuzzlePiece,
	users: faUsers,
	credentials: faKey,
	logs: faListOl,
	auth: "lock",
	bypasses: faWandMagicSparkles,
	settings: faGear,
};

function NavItem(props) {
	const text = props.text;
	let route = props.route;
	const lowerCaseText = text.toLowerCase();

	// set status to "active" if the current path is the same as the route
	const status = useLocation().pathname.includes(route) ? "active" : "";

	return (
		<li className={"nav-item " + status}>
			<Link to={"/" + route} className="nav-link">
				{/* show inline */}
				<FontAwesomeIcon icon={icons[lowerCaseText]} className="mr-2" />
				<p className="d-inline">{text}</p>
			</Link>
		</li>
	);
}

export default function SideBar() {
	const routes = {
		Dashboard: "dashboard",
		Operations: "operations",
		Devices: "devices",
		Listeners: "listeners",
		Stagers: "stagers",
		Users: "users",
		Credentials: "credentials",
		Bypasses: "bypasses",
		Loaders: "loaders",
		Modules: "modules",
		Logs: "logs",
		Settings: "settings",
	};
	return (
		<div
			className="sidebar"
			data-color="orange"
			data-background-color="black"
			data-image="/icon.png"
		>
			<div className="logo">
				<Link to="/" className="simple-text logo-normal text-warning">
					PhoenixC2
				</Link>
			</div>
			<div className="sidebar-wrapper">
				<ul className="nav">
					{Object.keys(routes).map((route) => (
						<NavItem
							key={routes[route]}
							text={route}
							route={routes[route]}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}
