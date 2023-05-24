import EditButton from "../../components/buttons/edit";
import DeleteButton from "../../components/buttons/delete";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
export default function CredentialCol(props) {
	const [showValue, setShowValue] = useState(false);

	var shownCredential = props.credential.value;

	if (!showValue) {
		shownCredential = "********";
	} else {
		shownCredential = shownCredential.substr(0, 20);

		if (props.credential.value.length > 20) {
			shownCredential += "...";
		}
	}
	async function deleteCredential(){
		const response = await request(`/credentials/${props.credential.id}/remove`, "DELETE");
		const data = await response.json();
		showNotification(data.message, data.status);
	}
	return (
		<tr>
			<td className="text-center">{props.credential.id}</td>
			<td>{props.credential.user ? props.credential.user : "N/A"}</td>
			<td>
				{shownCredential}{" "}
				{
					<a onClick={() => setShowValue(!showValue)}>
						<FontAwesomeIcon
							icon={showValue ? faEyeSlash : faEye}
						/>
					</a>
				}
			</td>
			<td>{props.credential.admin ? "✅" : "❌"}</td>
			<td>{props.credential.found_at}</td>
			<td>
				<EditButton
					onClick={() => {
						props.setCurrentEditCredential(props.credential);
						props.setShowEditModal(true);
					}}
				/>
				<DeleteButton onClick={deleteCredential}/>
			</td>
		</tr>
	);
}
