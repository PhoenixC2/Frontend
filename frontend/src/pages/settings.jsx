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

	// show settings or error if not admin
	if (user && !user.id === 1) {
		showNotification("You are not the super user", "danger");
		navigate("/dashboard");
	}
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
									onClick={() => clear("misc/downloads")}
								>
									Downloads
								</button>
								<button
									type="button"
									className="btn btn-danger mr-2"
									onClick={() => clear("misc/uploads")}
								>
									Uploads
								</button>
								<button
									type="button"
									className="btn btn-danger mr-2"
									onClick={() => clear("misc/stagers")}
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
								Useful if the device was deleted but the tasks
								were not.
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
				</div>
			</div>
		</div>
	);
}
