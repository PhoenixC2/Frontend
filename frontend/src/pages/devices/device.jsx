import { useEffect, useState } from "react";
import Active from "../../components/active";
import CustomButton from "../../components/buttons/custom";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "../../components/buttons/delete";
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
				<CustomButton
					color="primary"
					icon={faGear}
					title="Manage"
					onClick={showManageModal}
				/>
				<DeleteButton
					title="Clear"
					onClick={() => props.clearDevice(device.id)}
				/>
			</td>
		</tr>
	);
}
