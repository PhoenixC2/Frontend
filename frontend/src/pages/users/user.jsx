import { useState, useEffect } from "react";
import request from "../../logic/api";
import { getPictureUrl } from "../../logic/user";
import showNotification from "../../logic/notify";

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
				<i
					title={user.status}
					className="material-icons" // set color to green if user is active, orange if inactive and red if offline
					style={{
						color: user.status
							? "green"
							: user.status
							? "orange"
							: "red",
						marginTop: "4px",
						marginLeft: "4px",
					}}
				>
					circle
				</i>
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
				<button
					type="button"
					className="btn btn-warning"
					onClick={() => props.toggleShowEditModal(user)}
					title="Edit"
				>
					<i className="material-icons">edit</i>
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={deleteUser}
					title="Delete"
				>
					<i className="material-icons">delete</i>
				</button>
			</td>
		</tr>
	);
}
