import EditButton from "../../components/buttons/edit";
import DeleteButton from "../../components/buttons/delete";
export default function Credential(props) {
	return (
		<tr>
			<td>{props.credential.id}</td>
			<td>{props.credential.user ? props.credential.user : "None"}</td>
			<td>{props.credential.value}</td>
			<td>{props.credential.admin ? "✅" : "❌"}</td>
			<td>
				<EditButton />
				<DeleteButton />
			</td>
		</tr>
	);
}