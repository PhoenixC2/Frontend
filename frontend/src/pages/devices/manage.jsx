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
import { getData } from "../../logic/api";
import ModuleBrowser from "./modulebrowser";
import ActionSwitcher from "./actionswitcher";

export default function Manage(props) {
	const [device, setDevice] = useState(props.device);

	useEffect(() => {
		setDevice(props.device);
	}, [props.device]);
	
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
			refetchInterval: 3000,
		}
	);
    const actions = {
        "Modules": () => <ModuleBrowser device={device} />,
        "Test": () => <h1>Test</h1>,
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
								<h3 className="card-title text-warning">Tasks</h3>
							</div>
							<div className="card-body table-responsive">
								<table className="table">
									<thead>
										<tr>
											<th className="text-center">ID</th>
											<th>Name</th>
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
					</Col>
				</Row>
                <Row>
                    <Col>
                    <ActionSwitcher actions={actions} device={device} />
                    </Col>
                </Row>
			</Container>
		</>
	);
}
