import { useState, useEffect } from "react";
import request from "../../logic/api";
import { getPictureUrl } from "../../logic/user";
import showNotification from "../../logic/notify";
import EditButton from "../../components/buttons/edit";
import DeleteButton from "../../components/buttons/delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
export default function User(props) {
	const [user, setUser] = useState(props.user);

	useEffect(() => {
		setUser(props.user);
	}, [props.user]);

	async function deleteUser() {
		const response = await request(`/users/${user.id}/remove`, "DELETE");
		const data = await response.json();
		showNotification(data.message, data.status);
	}
	return (
		<tr>
			<td className="text-center">{user.id}</td>
			<td>
				<FontAwesomeIcon
					title={user.status}
					style={{
						marginTop: "4px",
						marginLeft: "4px",
					}}
					size="lg"
					color={
						user.status ? "green" : user.status ? "orange" : "red"
					}
					icon={faCircle}
				/>
			</td>
			<td>
				<img
					className="profile-picture"
					src={getPictureUrl(user.id)}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = "/icon.png";
					}}
				/>
			</td>
			<td>{user.username}</td>
			<td>{user.admin ? "✅" : "❌"}</td>
			<td>{user.disabled ? "✅" : "❌"}</td>
			<td>{user.last_activity ?? "Never"}</td>
			<td>
				<EditButton onClick={() => props.toggleShowEditModal(user)} />
				<DeleteButton onClick={deleteUser} />
			</td>
		</tr>
	);
}
