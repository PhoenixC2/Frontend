import { useEffect, useState } from "react";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import EditButton from "../../components/buttons/edit";
import DeleteButton from "../../components/buttons/delete";
export default function Chain(props) {
	const [chain, setChain] = useState(props.chain);

	useEffect(() => {
		setChain(props.chain);
	}, [props.chain]);

	async function deleteChain() {
		const response = await request(
			`bypasses/chains/${chain.id}/remove`,
			"DELETE"
		);
		const data = await response.json();
		showNotification(data.message, data.status);
	}


	return (
		<tr>
			<td className="text-center">{chain.id}</td>
			<td>{chain.name}</td>
			<td>
				{chain.description.substring(0, 30) +
					(chain.description.length > 30 ? "..." : "")}
			</td>
			<td>
				{chain.bypasses.map((bypass) => (
					<span key={bypass.id}>{bypass.name} </span>
				))}
				{chain.bypasses.length === 0 && <span>None</span>}
			</td>
			<td>
				<EditButton onClick={() => props.toggleShowEditModal(chain)} />
				<DeleteButton onClick={deleteChain} />
			</td>
		</tr>
	);
}
