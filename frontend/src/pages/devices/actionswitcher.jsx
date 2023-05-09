import React, { useState, useEffect } from "react";
import { Card, Dropdown, DropdownButton, Button } from "react-bootstrap";

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
		<div>
			{device.connected && (
				<>
					<DropdownButton id="dropdown-basic-button" title="Actions">
						{Object.keys(actions).map((action) => {
							return (
								<Dropdown.Item
									key={action}
									onClick={() => setActiveAction(action)}
								>
									{action}
								</Dropdown.Item>
							);
						})}
					</DropdownButton>
					{React.createElement(actions[activeAction], {
						device: device,
						setActiveTask: setActiveTask,
					})}
				</>
			)}
			{!device.connected && (
				<h4 className="card-title text-danger">Device not connected</h4>
			)}
			{activeTask && showActiveTask && (
				<>
					{activeTask.finished_at && (
						<>
							<h3 className="text-primary">
								Last Task : {activeTask.name}
							</h3>
							<h4 className="text-primary">
								Success: {activeTask.success ? "✅" : "❌"}
							</h4>
							<h4 className="text-primary">Output:</h4>
							{activeTask.action == "rce" && (
								<pre className="pre-scrollable bg-dark text-light">
									<code>{activeTask.output}</code>
								</pre>
							)}
							{activeTask.action == "download" && (
								<a
									className="btn btn-primary"
									rel="noreferrer noopener"
									href={`/api/misc/downloads/${activeTask.output}`}
									target="_blank"
								>
									Download {activeTask.output}
								</a>
							)}
							<Button
								variant="danger"
								onClick={() => setShowActiveTask(false)}
							>
								Hide last task
							</Button>
						</>
					)}
					{!activeTask.finished_at && (
						<Card>
							<Card.Body>
								<Card.Title className="text-primary" as="h3">
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
		</div>
	);
}
