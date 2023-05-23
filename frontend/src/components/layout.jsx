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
					<div className="container-fluid"><Outlet /></div>
				</div>
				{/* <footer className="footer">
					<div className="container-fluid">
						<nav className="float-right">
							<ul>
								<li>
									<a
										href="https://github.com/screamz2k"
										target="_blank"
                    rel="noreferrer noopener"
									>
										Screamz2k | Creator
									</a>
								</li>
								<li>
									<a
										href="https://github.com/PhoenixC2/Frontend"
										target="_blank"
									>
										Frontend Plugin
									</a>
								</li>
								<li>
									<a
										href="https://github.com/PhoenixC2/PhoenixC2"
										target="_blank"
									>
										PhoenixC2
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</footer> */}
			</div>
		</div>
	);
}
