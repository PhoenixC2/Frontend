import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import request, { getData } from "../../logic/api";
import showNotification from "../../logic/notify";
import Listener from "./listener";
import { CreateModal, EditModal } from "./crud";

export default function Listeners(props) {
	const [currentEditListener, setCurrentEditListener] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [searchParams] = useSearchParams();

	async function getListeners() {
		const response = await request("listeners/");
		const listenersData = await response.json();
		// modify listeners so .options attributes are on the same level as the rest
		const modifiedListeners = listenersData.listeners.map((listener) => {
			const { options, ...rest } = listener;
			return { ...rest, ...options };
		});
		return modifiedListeners;
	}
	
	async function editHandleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		const response = await request(
			`listeners/${currentEditListener.id}/edit`,
			"PUT",
			Object.fromEntries(data.entries())
		);
		const responseData = await response.json();
		showNotification(responseData.message, responseData.status);
		setShowEditModal(false);
	}

	useEffect(() => {
		if (searchParams.get("listener")) {
			const listener = listeners.find(
				(listener) => listener.id == searchParams.get("listener")
			);
			setCurrentEditListener(listener);
			setShowEditModal(true);
		} else if (searchParams.has("create")) {
			setShowCreateModal(true);
		}
	}, []);

	const { data: listenerTypes } = useQuery(["listenerTypes"], async () => {
		const data = await getData("listeners/available");
		return data.listeners;
	});

	const {
		data: listeners,
		isLoading,
		isError,
	} = useQuery(["listeners"], getListeners, {
		refetchInterval: 10000,
	});

	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th className="text-center">ID</th>
							<th>Active</th>
							<th>Name</th>
							<th>Address</th>
							<th>Port</th>
							<th>Type</th>
							<th>SSL</th>
							<th>Enabled</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{listeners &&
							listeners.length > 0 &&
							listeners.map((listener) => (
								<Listener
									listener={listener}
									listeners={listeners}
									setCurrentEditListener={
										setCurrentEditListener
									}
									setShowEditModal={setShowEditModal}
									key={listener.id}
								/>
							))}
						{isLoading && (
							<tr className="dark-background">
								<td className="text-warning" colSpan="9">
									Loading...
								</td>
							</tr>
						)}
						{isError && (
							<tr className="dark-background">
								<td className="text-danger" colSpan="9">
									Error fetching listeners
								</td>
							</tr>
						)}

						{listeners && listeners.length === 0 && (
							<tr className="dark-background">
								<td className="text-warning" colSpan="9">
									No listeners found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{listenerTypes && Object.keys(listenerTypes).length > 0 && (
				<CreateModal
					listenerTypes={listenerTypes}
					show={showCreateModal}
					setShow={setShowCreateModal}
				/>
			)}
			{currentEditListener && (
				<EditModal
					listener={currentEditListener}
					listenerTypes={listenerTypes}
					show={showEditModal}
					setShow={setShowEditModal}
					handleSubmit={editHandleSubmit}
				/>
			)}
		</>
	);
}
