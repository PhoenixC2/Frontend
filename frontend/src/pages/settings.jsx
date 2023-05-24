import request from "../logic/api";
import showNotification from "../logic/notify";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../logic/user";
import { useNavigate } from "react-router-dom";

async function clear(category) {
	const response = await request(`${category}/clear`, "DELETE");
	if (response.ok) {
		const data = await response.json();
		showNotification(data.message, data.status);
	}
}
export default function Settings(props) {
	const navigate = useNavigate();
	// show settings in good format using bootstrap
	async function fetchData() {
		try {
			return await fetchUser();
		} catch (error) {
			navigate("/login?error=You are not logged in");
		}
	}

	const { data: user } = useQuery(["user"], fetchData);
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-12">
					<div className="card card-plain">
						<div className="card-header card-header-warning">
							<h3 className="card-title">Admin Settings</h3>
							<p className="card-category">
								Extra settings and features for the super user.
							</p>
						</div>
					</div>
					{(user && user.id === 1) ? (
						<>
							<div className="card">
								<div className="card-header">
									<h3 className="card-title text-primary">
										Clear directories
									</h3>
									<p className="card-category">
										Click on the buttons below to clear the
										specified directories.
									</p>
								</div>
								<div className="card-body">
									<div className="row">
										<button
											type="button"
											className="btn btn-danger mr-2"
											onClick={() =>
												clear("misc/downloads")
											}
										>
											Downloads
										</button>
										<button
											type="button"
											className="btn btn-danger mr-2"
											onClick={() =>
												clear("misc/uploads")
											}
										>
											Uploads
										</button>
										<button
											type="button"
											className="btn btn-danger mr-2"
											onClick={() =>
												clear("misc/stagers")
											}
										>
											Generated Stagers
										</button>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-header">
									<h3 className="card-title text-primary">
										Clear finished tasks
									</h3>
									<p className="card-category">
										Useful if the device was deleted but the
										tasks were not.
									</p>
								</div>
								<div className="card-body">
									{/* padding between buttons */}
									<div className="row">
										<button
											type="button"
											className="btn btn-danger mr-2"
											onClick={() => clear("tasks/all")}
										>
											Clear Tasks
										</button>
									</div>
								</div>
							</div>
						</>
					) : (
						<div className="card">
							<div className="card-header">
								<h3 className="card-title text-danger">
									No Access
								</h3>
								<p className="card-category">
									You are not the <span className="text-primary">super user</span>, so you cannot
									access these settings.
								</p>
							</div>
						</div>
					)}

					<div className="card">
						<div className="card-header">
							<h3 className="card-title text-primary">
								About PhoenixC2
							</h3>
							<p className="card-category">
								Basic information about PhoenixC2.
							</p>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col">
									<p>
										<b className="text-primary">Version:</b> 1.0.0
									</p>
									<p>
										<b className="text-primary">Author:</b>{" "}
										<a
											href="https://github.com/screamz2k/"
											target="_blank"
											rel="noreferrer"
										>
											screamz2k
										</a>
									</p>
									<p>
										<b className="text-primary">License:</b> BSD-3-Clause
									</p>
									<p>
										<b className="text-primary">Frontend Plugin:</b>{" "}
										<a
											href="https://github.com/PhoenixC2/Frontend"
											target="_blank"
											rel="noreferrer"
										>
											GitHub
										</a>
									</p>
									<p>
										<b className="text-primary">PhoenixC2 Framework:</b>{" "}
										<a
											href="https://github.com/PhoenixC2/PhoenixC2"
											target="_blank"
											rel="noreferrer"
										>
											GitHub
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* end of card */}
				</div>
			</div>
		</div>
	);
}
