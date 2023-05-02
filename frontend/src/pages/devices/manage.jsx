import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLinux,
	faWindows,
	faApple,
} from "@fortawesome/free-brands-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQuery } from "@tanstack/react-query";
import request, { getData } from "../../logic/api";
import showNotification from "../../logic/notify";
import Paginate from "../../components/paginate";
import ActionSwitcher from "./actionswitcher";
import { ExecuteCommand, ReverseShell, DownloadFile, UploadFile, ModuleBrowser } from "./actions";
import TasksTable from "./tasks";

export default function Manage(props) {
	const [device, setDevice] = useState(props.device);

	useEffect(() => {
		setDevice(props.device);
	}, [props.device]);

	async function clearTask(id) {
		const response = await request(`tasks/${id}/clear`, "DELETE");
		const data = await response.json();
		showNotification(data.message, data.status);
	}
	const {
		isLoading: tasksLoading,
		isError: tasksError,
		data: tasks,
	} = useQuery(
		["tasks"],
		async () => {
			const data = await getData("tasks/");
			return data.tasks;
		},
		{
			refetchInterval: 3000,
		}
	);

	const actions = {
		"Execute Command": ExecuteCommand,
		"Reverse Shell": ReverseShell,
		"Download File": DownloadFile,
		"Upload File": UploadFile,
		Modules: ModuleBrowser,
	};
	return (
		<>
			<Container fluid>
				<Row>
					<Col sm={4}>
						<div className="card dark-background border border-warning">
							<div className="card-body">
								<h3 className="card-title text-primary">
									Infos
								</h3>
								{/* show infos on the left */}
								<ul className="list-group list-group-flush">
									<li className="list-group-item ">
										<strong className="text-warning">
											Name:
										</strong>{" "}
										{device.name}
									</li>
									<li className="list-group-item">
										<strong className="text-warning">
											Connected:
										</strong>{" "}
										{device.connected ? "✅" : "❌"}
									</li>
									<li className="list-group-item">
										<strong className="text-warning">
											Hostname:
										</strong>{" "}
										{device.hostname}
									</li>
									<li className="list-group-item">
										<strong className="text-warning">
											IP Address:
										</strong>{" "}
										{device.address}
									</li>
									<li className="list-group-item">
										<strong className="text-warning">
											OS:{" "}
										</strong>
										{device.os}{" "}
										<FontAwesomeIcon
											icon={
												device.os === "windows"
													? faWindows
													: device.os === "linux"
													? faLinux
													: faApple
											}
										/>
									</li>
									<li className="list-group-item">
										<strong className="text-warning">
											Process Owner:
										</strong>{" "}
										{device.user}
									</li>
									<li className="list-group-item">
										<strong className="text-warning">
											Admin Privileges:
										</strong>{" "}
										{device.admin ? "✅" : "❌"}
									</li>
								</ul>
							</div>
						</div>
					</Col>
					<Col sm={8}>
						<div className="card dark-background border border-warning">
							<div className="card-header">
								<h3 className="card-title text-warning">
									Tasks
								</h3>
							</div>
							<div className="card-body">
								<Paginate
									data={tasks}
									itemsPerPage={3}
									content={TasksTable}
								/>
								{tasks && tasks.length > 0 && (
								<button className="btn btn-danger" onClick={() => clearTask("all")}>
									Clear All
								</button>
								)}
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<ActionSwitcher actions={actions} device={device} tasks={tasks} />
					</Col>
				</Row>
			</Container>
		</>
	);
}
