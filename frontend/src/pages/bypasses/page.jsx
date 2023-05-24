import { useQuery } from "@tanstack/react-query";
import { getData } from "../../logic/api";
import Chain from "./chain";
import RunSingleBypass from "./single";
import Modal from "../../components/modal";
import { useState } from "react";
import Form from "./crud";

export default function Chains(props) {
	const [showSingleRun, setShowSingleRun] = useState(false);
	const [currentEditChain, setCurrentEditChain] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);

	function toggleShowEditModal(chain) {
		setCurrentEditChain(chain)
		setShowEditModal(true);
	}

	const {
		data: chains,
		isLoading,
		isError,
	} = useQuery(
		["chains"],
		async () => {
			const data = await getData("bypasses/chains?creator=true");
			return data.chains;
		},
		{
			refetchInterval: 10000,
		}
	);

	const {
		data: bypasses,
		bypassesIsLoading,
		bypassesIsError,
	} = useQuery(["bypasses"], async () => {
		const data = await getData("bypasses/?full=true");
		return data.bypasses;
	});

	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th className="text-center">ID</th>
							<th>Name</th>
							<th>Description</th>
							<th>Bypasses</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{chains &&
							chains.length > 0 &&
							chains.map((operation) => (
								<Chain key={operation.id} chain={operation} toggleShowEditModal={toggleShowEditModal} />
							))}
						{isLoading && (
							<tr>
								<td className="text-warning" colSpan="9">
									Loading...
								</td>
							</tr>
						)}
						{isError && (
							<tr>
								<td className="text-danger" colSpan="9">
									Error fetching chains
								</td>
							</tr>
						)}
						{chains && chains.length === 0 && (
							<tr>
								<td className="text-warning" colSpan="9">
									No chains found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<button
				className="btn btn-primary"
				onClick={() => setShowSingleRun(!showSingleRun)}
			>
				Run single bypass
			</button>
			{showSingleRun && (
				<Modal
					title="Run single bypass"
					show={showSingleRun}
					setShow={setShowSingleRun}
					onClose={() => setShowSingleRun(false)}
					body={<RunSingleBypass bypasses={bypasses} />}
				/>
			)}
			<button 
				className="btn btn-primary" 
				onClick={() => {
					setShowCreateModal(true);
				}}>
					Add Bypass Chain
				</button>

			<Modal
				show={showCreateModal}
				setShow={setShowCreateModal}
				title="Add Bypass Chain"
				body={<Form setShow={setShowCreateModal} />}
			/>
			{currentEditChain && (
				<Modal
					show={showEditModal}
					setShow={setShowEditModal}
					title="Edit Bypass Chain"
					body={
						<Form
							setShow={setCurrentEditChain}
							chain={currentEditChain}

						/>
					}
				/>
			)}
		</>
	);
}
