import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Container, Row, Col } from "react-bootstrap";
export default function ActionSwitcher(props) {
	const [actions, setActions] = useState(props.actions);
	const [activeAction, setActiveAction] = useState(Object.keys(actions)[0]);
	const [device, setDevice] = useState(props.device);
	const [activeTask, setActiveTask] = useState(null);
	const [showActiveTask, setShowActiveTask] = useState(true);

	useEffect(() => {
		setDevice(props.device);
		if (props.tasks && activeTask) {
			const task = props.tasks.find((task) => task.id === activeTask.id);
			setActiveTask(task);
		}
	}, [props.Device, props.tasks]);

	return (
		<div className="container-fluid border border-warning">
			<h3 className="card-title text-primary">ActionSwitcher</h3>
			{device.connected && (
				<>
					<div className="row">
						<div className="col">
							<DropdownButton
								id="dropdown-basic-button"
								title="Actions"
							>
								{Object.keys(actions).map((action) => {
									return (
										<Dropdown.Item
											key={action}
											onClick={() =>
												setActiveAction(action)
											}
										>
											{action}
										</Dropdown.Item>
									);
								})}
							</DropdownButton>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-sm-12">
							{React.createElement(actions[activeAction], {
								device: device,
								setActiveTask: setActiveTask,
							})}
						</div>
					</div>
				</>
			)}
			{!device.connected && (
				<div className="row">
					<div className="col">
						<h4 className="card-title text-danger">
							Device not connected
						</h4>
					</div>
				</div>
			)}
			<div className="row">
				<div className="col">
					{activeTask && showActiveTask && (
						<>
							{activeTask.finished_at && (
								<div className="card dark-background">
									<div className="card-body">
										<h3 className="card-title text-primary">
											Last Task : {activeTask.name}
										</h3>
										<h4 className="card-text text-primary">
											Success:{" "}
											{activeTask.success ? "✅" : "❌"}
										</h4>
										<h4 className="card-title text-primary">
											Output:
										</h4>
										<Container>
											<Row>
												{activeTask.action == "rce" && (
													<pre className="pre-scrollable bg-dark text-light">
														<code>
															{activeTask.output}
														</code>
													</pre>
												)}

												{activeTask.action ==
													"download" && (
													<a
														className="btn btn-primary"
														href={`/api/misc/downloads/${activeTask.output}`}
														target="_blank"
													>
														Download{" "}
														{activeTask.output}
													</a>
												)}
											</Row>
											<Row>
												<button
													className="btn btn-danger"
													onClick={() =>
														setShowActiveTask(false)
													}
												>
													Hide last task
												</button>
											</Row>
										</Container>
									</div>
								</div>
							)}

							{!activeTask.finished_at && (
								<div className="card dark-background">
									<div className="card-body">
										<h3 className="card-title text-primary">
											Running Task...
										</h3>
									</div>
								</div>
							)}
						</>
					)}
					{activeTask && !showActiveTask && (
						<button
							className="btn btn-primary"
							onClick={() => setShowActiveTask(true)}
						>
							Show Last Task
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
