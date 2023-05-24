import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "../../components/modal";
import { getData } from "../../logic/api";
import showNotification from "../../logic/notify";
import Form from "./crud";
import User from "./user";

export default function Users(props) {
	const [currentEditUser, setCurrentEditUser] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	function toggleShowEditModal(user) {
		setCurrentEditUser(user);
		setShowEditModal(true);
	}

	const {
		data: users,
		isLoading,
		isError,
	} = useQuery(
		["users"],
		async () => {
			const data = await getData("users/");
			return data.users;
		},
		{ refetchInterval: 10000 }
	);

	useEffect(() => {
		if (searchParams.get("user")) {
			const user = users?.find(
				(user) => user.id === parseInt(searchParams.get("user"))
			);
			if (user) {
				toggleShowEditModal(user);
			} else {
				showNotification("User not found", "danger");
			}
		} else if (searchParams.has("create")) {
			setShowCreateModal(true);
		}
	}, []);

	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th className="text-center">ID</th>
							<th>Status</th>
							<th>Profile Picture</th>
							<th>Username</th>
							<th>Admin</th>
							<th>Disabled</th>
							<th>Last Activity</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map((user) => (
								<User key={user.id} user={user} toggleShowEditModal={toggleShowEditModal} />
							))}
						{isLoading && (
							<tr>
								<td className="text-warning" colSpan="8">
									Loading...
								</td>
							</tr>
						)}
						{isError && (
							<tr>
								<td className="text-danger" colSpan="8">
									Error fetching users
								</td>
							</tr>
						)}
						{users && users.length === 0 && (
							<tr>
								<td className="text-warning" colSpan="8">
									No users found
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
				Add User
			</button>
			<Modal
				show={showCreateModal}
				setShow={setShowCreateModal}
				title="Add User"
				body={<Form setShow={setShowCreateModal} />}
			/>
			{currentEditUser && (
				<Modal
					show={showEditModal}
					setShow={setShowEditModal}
					title="Edit User"
					body={
						<Form
							setShow={setCurrentEditUser}
							user={currentEditUser}
						/>
					}
				/>
			)}
		</>
	);
}
