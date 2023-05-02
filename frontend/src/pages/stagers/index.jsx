import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { getData } from "../../logic/api";
import Stager from "./stager";
import { CreateModal, EditModal } from "./crud";

export default function Stagers(props) {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [currentEditStager, setCurrentEditStager] = useState(null);

	const {
		data: stagers,
		isLoading,
		isError,
	} = useQuery(
		["stagers"],
		async () => {
			const data = await getData("stagers/?listener=true");
			return data.stagers;
		},
		{ refetchInterval: 10000 }
	);
	const {
		data: stagerTypes,
	} = useQuery(["stagerTypes"], async () => {
		const data = await getData("stagers/available");
		return data.available;

	});

	const { data: listeners } = useQuery(
		["listeners"],
		async () => {
			const data = await getData("listeners/");
			return data.listeners;
		},
		{ refetchInterval: 10000 }
	);

	console.log(currentEditStager)
	return (
		<>
			<div className="table-responsive">
				<Table>
					<thead>
						<tr>
							<th className="text-center">ID</th>
							<th>Name</th>
							<th>Listener</th>
							<th>Type</th>
							<th>Payload</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{stagers &&
							stagers.map((stager) => (
								<Stager
									stager={stager}
									key={stager.id}
									setCurrentEditStager={setCurrentEditStager}
									setShowEditModal={setShowEditModal}
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
									Error fetching stagers
								</td>
							</tr>
						)}
						{stagers && stagers.length === 0 && (
							<tr className="dark-background">
								<td className="text-warning" colSpan="9">
									No stagers found
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
			{listeners && listeners.length > 0 && stagerTypes && (
				<>
					<CreateModal
						show={showCreateModal}
						setShow={setShowCreateModal}
						listeners={listeners}
						stagerTypes={stagerTypes}
					/>
				</>
			)}
			{currentEditStager && (
				<EditModal
					show={showEditModal}
					setShow={setShowEditModal}
					stagerTypes={stagerTypes}
					stager={currentEditStager}
				/>
			)}
		</>
	);
}
