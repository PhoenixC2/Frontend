import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
export default function Stager(props) {
	const [stager, setStager] = useState(props.stager);

	useEffect(() => {
		setStager(props.stager);
	}, [props]);

	async function deleteStager() {
		const response = await request(
			`stagers/${stager.id}/remove`,
			"DELETE"
		);
		const data = await response.json();
		showNotification(data.message, data.status);
	}

		
	function getDownloadUrl() {
		return "/api/stagers/" + stager.id + "/download";
	}

	function showEditModal(){
		props.setCurrentEditStager(stager);
		props.setShowEditModal(true);
	}
	return (
		<tr className="dark-background" key={stager.id}>
			<td className="text-center">{stager.id}</td>
			<td>{stager.name}</td>
			<td>
				<Link to={`/listeners/?listener=${stager.listener.id}`}>
					{stager.listener.name}
				</Link>
			</td>
			<td>{stager.listener.type}</td>
			<td>{stager.payload}</td>
			<td>
				<Link
					to={getDownloadUrl()}
					className="btn btn-success"
					target="_blank"
				>
					Download
				</Link>
				<Button variant="warning" onClick={showEditModal}>Edit</Button>
				<Button variant="danger" onClick={deleteStager}>Delete</Button>
			</td>
		</tr>
	);
}
