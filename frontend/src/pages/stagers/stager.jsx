import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import request from "../../logic/api";
import showNotification from "../../logic/notify";

export default function Stager(props) {
	const [stager, setStager] = useState(props.stager);

	useEffect(() => {
		setStager(props.stager);
	}, [props]);

	async function deleteStager() {
		const response = await request(`stagers/${stager.id}/remove`, "DELETE");
		const data = await response.json();
		showNotification(data.message, data.status);
	}

	async function recompileStager() {
		// downloads the payload with recompile argument set to true
		const response = await request(
			`stagers/${stager.id}/download?recompile?=true`,
			"GET"
		);
		if (response.status === 200) {
			showNotification("Stager recompiled successfully", "success");
		}
	}

	function getDownloadUrl() {
		return "/api/stagers/" + stager.id + "/download";
	}

	function showEditModal() {
		props.setCurrentEditStager(stager);
		props.setShowEditModal(true);
	}
	
	const payload =
		props.stagerTypes[stager.listener.type].payloads[stager.payload];

	return (
		<tr key={stager.id}>
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
					title="Download"
				>
					<i className="material-icons">get_app</i>
				</Link>
				{payload && payload.compiled && (
					<Button
						variant="info"
						title="Compile"
						onClick={recompileStager}
					>
						<i className="material-icons">build</i>
					</Button>
				)}
				<Button variant="warning" onClick={showEditModal} title="Edit">
					<i className="material-icons">edit</i>
				</Button>
				<Button variant="danger" onClick={deleteStager} title="Delete">
					<i className="material-icons">delete</i>
				</Button>
			</td>
		</tr>
	);
}
