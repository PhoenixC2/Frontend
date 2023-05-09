import React, { useState, useEffect } from "react";
import {
	Card,
	Container,
	Row,
	Col,
	Dropdown,
	DropdownButton,
	Button,
} from "react-bootstrap";

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
		<Container fluid className="border border-warning rounded p-3">
			<h3 className="card-title text-primary">Actions</h3>
			{device.connected && (
				<>
					<Row>
						<Col>
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
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							{React.createElement(actions[activeAction], {
								device: device,
								setActiveTask: setActiveTask,
							})}
						</Col>
					</Row>
				</>
			)}
			{!device.connected && (
				<Row>
					<Col>
						<h4 className="card-title text-danger">
							Device not connected
						</h4>
					</Col>
				</Row>
			)}
			<Row>
				<Col>
					{activeTask && showActiveTask && (
						<>
							{activeTask.finished_at && (
								<Card className="dark-background">
									<Card.Body>
										<Card.Title
											className="text-primary"
											as="h3"
										>
											Last Task : {activeTask.name}
										</Card.Title>
										<Card.Text
											className="text-primary"
											as="h4"
										>
											Success:{" "}
											{activeTask.success ? "✅" : "❌"}
										</Card.Text>
										<Card.Text
											className="text-primary"
											as="h4"
										>
											Output:
										</Card.Text>
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
														rel="noreferrer noopener"
														href={`/api/misc/downloads/${activeTask.output}`}
														target="_blank"
													>
														Download{" "}
														{activeTask.output}
													</a>
												)}
											</Row>
											<Row>
												<Button
													variant="danger"
													onClick={() =>
														setShowActiveTask(false)
													}
												>
													Hide last task
												</Button>
											</Row>
										</Container>
									</Card.Body>
								</Card>
							)}
							{!activeTask.finished_at && (
								<Card className="dark-background">
									<Card.Body>
										<Card.Title
											className="text-primary"
											as="h3"
										>
											Running Task...
										</Card.Title>
									</Card.Body>
								</Card>
							)}
						</>
					)}
					{activeTask && !showActiveTask && (
						<Button
							variant="primary"
							onClick={() => setShowActiveTask(true)}
						>
							Show Last Task
						</Button>
					)}
				</Col>
			</Row>
		</Container>
	);
}
