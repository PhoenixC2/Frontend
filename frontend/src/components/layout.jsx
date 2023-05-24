import SideBar from "./layout/sidebar";
import NavBar from "./layout/navbar";
import { Outlet } from "react-router-dom";

export default function Layout(props) {
	return (
		<div className="wrapper ">
			<SideBar />
			<div className="main-panel">
				<NavBar />
				<div className="content">
					<div className="container-fluid">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
