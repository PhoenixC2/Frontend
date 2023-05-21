import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import request, { getData } from "../../logic/api";
import showNotification from "../../logic/notify";
import Modal from "../../components/modal";
import Device from "./device";
import Manage from "./manage";

export default function Devices(props) {
	const [activeManagedDevice, setActiveManagedDevice] = useState(null);
	const [show, setShow] = useState(false);
	const [searchParams] = useSearchParams();

	async function clearDevice(id) {
		const response = await request(`devices/${id}/clear`, "DELETE");
		const data = await response.json();
		showNotification(data.message, data.status);
	}


	
	const {
		data: devices,
		isLoading,
		isError,
	} = useQuery(
		["devices"],
		async () => {
			const data = await getData("devices/");
			return data.devices;
		},
		{
			refetchInterval: 10000,
		}
	);

	useEffect(() => {
		if (searchParams.get("device")) {
			// get device from devices
			const device = devices.find(
				(device) => device.id == searchParams.get("device")
			);
			if (device) {
				setActiveManagedDevice(device);
				setShow(true);
			}
			else {
				showNotification("Device not found", "danger");
			}
		}
	}, [searchParams]);
	
	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th className="text-center">ID</th>
							<th>Active</th>
							<th>Name</th>
							<th>Hostname</th>
							<th>Address</th>
							<th>Os</th>
							<th>Architecture</th>
							<th>User</th>
							<th>Last Online</th>
							<th>Connection Time</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{devices &&
							devices.map((device) => (
								<Device
									key={device.id}
									device={device}
									clearDevice={clearDevice}
									setShow={setShow}
									setActiveManagedDevice={setActiveManagedDevice}
								/>
							))}
						{isLoading && (
							<tr>
								<td className="text-warning" colSpan="11">
									Loading...
								</td>
							</tr>
						)}
						{isError && (
							<tr>
								<td className="text-danger" colSpan="11">
									Error fetching devices
								</td>
							</tr>
						)}
						{devices && devices.length === 0 && (
							<tr>
								<td className="text-warning" colSpan="11">
									No devices found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{devices && devices.length > 0 && (
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => clearDevice("all")}
				>
					Clear All
				</button>
			)}
			{activeManagedDevice && (
				<Modal 
					id="manageDeviceModal"
					title={"Device: " + activeManagedDevice.name}
					body={<Manage device={activeManagedDevice} />}
					show={show}
					setShow={setShow}
					options={{
						size: "lg",
					}}
				/>
			)}
		</>
	);
}
