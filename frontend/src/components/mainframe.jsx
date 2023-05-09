import SideBar from "./frame/sidebar";
import NavBar from "./frame/navbar";

export default function MainFrame(props) {
	const body = props.body ? props.body : <div>Empty</div>;

	return (
		<div class="wrapper ">
			<SideBar />
			<div className="main-panel">
				<NavBar />
				<div className="content">
					<div className="container-fluid">{body}</div>
				</div>
				<footer class="footer">
					<div class="container-fluid">
						<nav class="float-right">
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
				</footer>{" "}
			</div>
		</div>
	);
}
