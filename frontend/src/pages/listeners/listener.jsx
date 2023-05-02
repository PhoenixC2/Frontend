import { useEffect, useState } from "react";
import showNotification from "../../logic/notify";
import request from "../../logic/api";
import Active from "../../components/active";

export default function Listener(props) {
	const [listener, setListener] = useState(props.listener);
	const [listeners, setListeners] = useState(props.listeners);
	const [restartActive, setRestartActive] = useState(false);

	useEffect(() => {
		setListener(props.listener);
		setListeners(props.listeners);
	}, [props.listener, props.listeners]);

	// show edit modal
	function showEditModal() {
		props.setCurrentEditListener(listener);
		props.setShowEditModal(true);
	}

	// management functions
	async function start() {
		listener.active = true;

		const response = await request(
			`listeners/${listener.id}/start`,
			"POST"
		);
		const responseData = await response.json();

		showNotification(responseData.message, responseData.status);
	}

	async function stop() {
		listener.active = false;

		const response = await request(`listeners/${listener.id}/stop`, "POST");
		const responseData = await response.json();

		showNotification(responseData.message, responseData.status);
	}

	async function restart() {
		listener.active = false;
		setRestartActive(true);
		const response = await request(
			`listeners/${listener.id}/restart`,
			"POST"
		);
		const responseData = await response.json();

		listener.active = true;
		setRestartActive(false);
		showNotification(responseData.message, responseData.status);
	}

	async function remove() {
		const response = await request(
			`listeners/${listener.id}/remove?stop=true`,
			"DELETE"
		);
		const responseData = await response.json();

		showNotification(responseData.message, responseData.status);
	}
	return (
		<>
			{listener && (
				<tr className="dark-background">
					<td className="text-center">{listener.id}</td>
					<td>
						<Active active={listener.active && !restartActive} />
					</td>
					<td>{listener.name}</td>
					<td>{listener.address}</td>
					<td>{listener.port}</td>
					<td>{listener.type}</td>
					<td>{listener.ssl ? "✅" : "❌"}</td>
					<td>{listener.enabled ? "✅" : "❌"}</td>
					<td>
						{!listener.active && (
							<button
								type="button"
								className="btn btn-success"
								data-toggle="tooltip"
								data-placement="top"
								title="Start"
								onClick={start}
							>
								<i className="material-icons">play_arrow</i>
							</button>
						)}
						{listener.active && (
							<button
								type="button"
								className="btn btn-info"
								data-toggle="tooltip"
								data-placement="top"
								title="Restart"
								onClick={restart}
							>
								<i className="material-icons">restart_alt</i>
							</button>
						)}
						{listener.active && (
							<button
								type="button"
								className="btn btn-danger"
								data-toggle="tooltip"
								data-placement="top"
								title="Stop"
								onClick={stop}
							>
								<i className="material-icons">stop</i>
							</button>
						)}
						<button
							type="button"
							className="btn btn-warning"
							data-toggle="tooltip"
							data-placement="top"
							title="Edit"
							onClick={showEditModal}
						>
							<i className="material-icons">edit</i>
						</button>
						<button
							type="button"
							className="btn btn-danger"
							data-toggle="tooltip"
							data-placement="top"
							title="Delete"
							onClick={remove}
						>
							<i className="material-icons">delete</i>
						</button>
					</td>
				</tr>
			)}
		</>
	);
}
