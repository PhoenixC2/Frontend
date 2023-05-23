import { useEffect, useState } from "react";
import showNotification from "../../logic/notify";
import request from "../../logic/api";
import Active from "../../components/active";
import { faArrowRotateRight, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../components/buttons/custom";
import EditButton from "../../components/buttons/edit";
import DeleteButton from "../../components/buttons/delete";
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
				<tr>
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
							<CustomButton
								color="success"
								icon={faPlay}
								title="Start"
								onClick={start}
							/>
						)}
						{listener.active && (
							<CustomButton
								color="info"
								icon={faArrowRotateRight}
								title="Restart"
								onClick={restart}
							/>
						)}
						{listener.active && (
							<CustomButton
								color="danger"
								icon={faStop}
								title="Stop"
								onClick={stop}
							/>
						)}
						<EditButton
							onClick={showEditModal}
						/>
						<DeleteButton
							onClick={remove}
						/>
					</td>
				</tr>
			)}
		</>
	);
}
