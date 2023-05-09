import { useEffect, useState } from "react";
import Active from "../../components/active";

export default function Device(props) {
	const [device, setDevice] = useState(props.device);

	useEffect(() => {
		setDevice(props.device);
	}, [props.device]);

	function showManageModal() {
		props.setShow(true);
		props.setActiveManagedDevice(device);
	}

	return (
		<tr key={device.id}>
			<td className="text-center">{device.id}</td>
			<td>
				<Active
					active={device.connected}
					activeTitle="Connected"
					inactiveTitle="Disconnected"
				/>
			</td>
			<td>{device.name}</td>
			<td>{device.hostname}</td>
			<td>{device.address}</td>
			<td>{device.os}</td>
			<td>{device.architecture}</td>
			<td>{device.user}</td>
			<td>{device.last_online}</td>
			<td>{device.connection_time}</td>
			<td>
				<button
					type="button"
					className="btn btn-warning"
					onClick={showManageModal}
					title="Manage"
				>
					<i className="material-icons">settings</i>
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => props.clearDevice(device.id)}
					title="Clear"
				>
					<i className="material-icons">delete</i>
				</button>
			</td>
		</tr>
	);
}
