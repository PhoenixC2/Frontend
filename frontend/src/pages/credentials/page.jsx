import { useQuery } from "@tanstack/react-query";
import { getData } from "../../logic/api";
import { useState } from "react";
import Modal from "../../components/modal";
import Form from "./crud";
import CredentialCol from "./credential";

export default function Credentials() {
	const [currentEditCredential, setCurrentEditCredential] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const {
		data: credentials,
		isLoading,
		isError,
	} = useQuery(
		["credentials"],
		async () => {
			const data = await getData("credentials/");
			return data.credentials;
		},
		{
			refetchInterval: 10000,
		}
	);

	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th className="text-center">ID</th>
							<th>User</th>
							<th>Value</th>
							<th>Admin Access</th>
							<th>Found at</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{credentials &&
							credentials.map((credential) => (
								<CredentialCol
									key={credential.id}
									credential={credential}
									setShowEditModal={setShowEditModal}
									setCurrentEditCredential={
										setCurrentEditCredential
									}
								/>
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
								<td className="text-danger" colSpan="5">
									Error fetching credentials
								</td>
							</tr>
						)}
						{credentials && credentials.length === 0 && (
							<tr>
								<td className="text-warning" colSpan="5">
									No credentials found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<button
				className="btn btn-primary"
				onClick={() => setShowCreateModal(true)}
			>
				Add Credential
			</button>
			<Modal
				show={showCreateModal}
				setShow={setShowCreateModal}
				title="Add User"
				body={<Form setShow={setShowCreateModal} />}
			/>
			{currentEditCredential && (
				<Modal
					show={showEditModal}
					setShow={setShowEditModal}
					title="Edit Credential"
					body={
						<Form
							setShow={setCurrentEditCredential}
							credential={currentEditCredential}
						/>
					}
				/>
			)}
		</>
	);
}
