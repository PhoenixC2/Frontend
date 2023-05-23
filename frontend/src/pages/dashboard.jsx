import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../logic/api";
import Active from "../components/active";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer, faWifi, faUsers, faSignal} from "@fortawesome/free-solid-svg-icons";
export default function DashBoard() {
	const { data: dashboard } = useQuery(
		["dashboard"],
		async () => getData("dashboard"),
		{
			refetchInterval: 10000,
		}
	);

	const {
		isLoading: devicesLoading,
		isError: devicesError,
		data: devices,
	} = useQuery(
		["devices"],
		async () => {
			const data = await getData("devices/");
			return data.devices;
		},
		{
			refetchInterval: 10000,
		}
	);

	const {
		isLoading: tasksLoading,
		isError: tasksError,
		data: tasks,
	} = useQuery(
		["tasks"],
		async () => {
			const data = await getData("tasks/?device=true");
			return data.tasks;
		},
		{
			refetchInterval: 10000,
		}
	);

	return (
		dashboard && (
			<>
				<div className="row">
					<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
						<div className="card card-stats">
							<div className="card-header card-header-warning card-header-icon">
								<div className="card-icon">
									{/* make way bigger */}
									<FontAwesomeIcon icon={faServer} size="3x" />
								</div>
								<p className="card-category">
									Connected devices
								</p>
								<h3 className="card-title text-primary">
									{dashboard.active_devices}
								</h3>
							</div>
							<div className="card-footer">
								<div className="stats">
									<Link
										className="text-warning"
										to="/devices"
									>
										Manage devices
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
						<div className="card card-stats">
							<div className="card-header card-header-danger card-header-icon">
								<div className="card-icon">
									<FontAwesomeIcon icon={faWifi} size="3x" />
								</div>
								<p className="card-category">
									Active listeners
								</p>
								<h3 className="card-title text-primary">
									{dashboard.active_listeners}
								</h3>
							</div>
							<div className="card-footer">
								<div className="stats">
									<Link
										className="text-warning"
										to="/listeners"
									>
										Manage Listeners
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
						<div className="card card-stats">
							<div className="card-header card-header-success card-header-icon">
								<div className="card-icon">
									<FontAwesomeIcon icon={faUsers} size="3x" />
								</div>
								<p className="card-category">Users active</p>
								<h3 className="card-title text-primary">
									{dashboard.active_users}
								</h3>
							</div>
							<div className="card-footer">
								<div className="stats">
									<Link className="text-warning" to="/users">
										Manage users
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
						<div className="card card-stats">
							<div className="card-header card-header-info card-header-icon">
								<div className="card-icon">
									<FontAwesomeIcon icon={faSignal} size="3x" />
								</div>
								<p className="card-category">
									Connections last hour
								</p>
								<h3 className="card-title text-primary">
									{dashboard.connections_last_hour}
								</h3>
							</div>
							<div className="card-footer">
								<div className="stats">
									Connections today:{" "}
									{dashboard.connections_today}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-md-12">
						<div className="card">
							<div className="card-header card-header-warning">
								<h4 className="card-title">Devices</h4>
							</div>
							<div className="card-body table-responsive">
								<table className="table">
									<thead>
										<tr>
											<th className="text-center">ID</th>
											<th>Hostname</th>
											<th>Address</th>
											<th>Connected</th>
										</tr>
									</thead>
									<tbody>
										{devices &&
											devices
												.slice(0, 6)
												.map((device) => (
													<tr key={device.id}>
														<td className="text-center">
															{device.id}
														</td>
														<td>
															<Link
																to={`/devices/?device=${device.id}`}
															>
																{
																	device.hostname
																}
															</Link>
														</td>
														<td>
															{device.address}
														</td>
														<td>
															<Active active={device.connected} activeTitle="Connected" inactiveTitle="Disconnected" />
														</td>
													</tr>
												))}
										{devicesLoading && (
											<tr>
												<td
													className="text-warning"
													colSpan="4"
												>
													Loading...
												</td>
											</tr>
										)}
										{devicesError && (
											<tr>
												<td
													className="text-danger"
													colSpan="4"
												>
													Error fetching devices
												</td>
											</tr>
										)}
										{devices && devices.length > 0 && (
											<tr>
												<td
													className="text-warning"
													colSpan="4"
												>
													Showing{" "}
													{devices.slice(0, 6).length}{" "}
													of {devices.length} devices
												</td>
											</tr>
										)}
										{devices && devices.length === 0 && (
											<tr>
												<td
													className="text-warning"
													colSpan="4"
												>
													No devices found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-md-12">
						<div className="card">
							<div className="card-header card-header-warning">
								<h4 className="card-title">Tasks</h4>
							</div>
							<div className="card-body table-responsive">
								<table className="table">
									<thead>
										<tr>
											<th className="text-center">ID</th>
											<th>Name</th>
											<th>Device</th>
											<th>Action</th>
											<th>Success</th>
										</tr>
									</thead>
									<tbody>
										{tasks &&
											tasks.slice(0, 6).map((task) => (
												<tr key={task.id}>
													<td className="text-center">{task.id}</td>
													<td>{task.name}</td>
													<td className={task.device ? "" : "text-danger"}>{task.device ? task.device.name : "Device got deleted"}</td>
													<td>{task.action}</td>
													<td>
														{task.success
															? "✅"
															: "❌"}
													</td>
												</tr>
											))}
										{tasksLoading && (
											<tr>
												<td
													className="text-warning"
													colSpan="5"
												>
													Loading...
												</td>
											</tr>
										)}
										{tasksError && (
											<tr>
												<td
													className="text-danger"
													colSpan="5"
												>
													Error fetching tasks
												</td>
											</tr>
										)}
										{tasks && tasks.length > 0 && (
											<tr>
												<td
													className="text-warning"
													colSpan="5"
												>
													Showing{" "}
													{tasks.slice(0, 6).length}{" "}
													of {tasks.length} tasks
												</td>
											</tr>
										)}
										{tasks && tasks.length === 0 && (
											<tr>
												<td
													className="text-warning"
													colSpan="5"
												>
													No tasks found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{dashboard.active_listeners === 0 && (
					<div className="card card-nav-tabs">
						<div className="card-header card-header-warning">
							Suggestion
						</div>
						<div className="card-body">
							<h4 className="card-title">
								Create or start your first listener.
							</h4>
							<Link
								to="/listeners?create=true"
								className="btn btn-danger"
							>
								Create listener
							</Link>
						</div>
					</div>
				)}
			</>
		)
	);
}
