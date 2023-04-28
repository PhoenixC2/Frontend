import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
export default function ActionSwitcher(props) {
	// actions are in the format: {"action": {/*component*/}, ...}
	const [actions, setActions] = useState(props.actions);
	const [device, setDevice] = useState(props.device);
	const [activeAction, setActiveAction] = useState(Object.keys(actions)[0]);

	useEffect(() => {
		setActions(props.actions);
		setDevice(props.device);
	}, [props.actions, props.device]);

	// bootstrap container with select to switch between actions
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
							{React.createElement(actions[activeAction])}
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
		</div>
	);
}
