import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import CustomButton from "../../components/buttons/custom";
import DeleteButton from "../../components/buttons/delete";
import EditButton from "../../components/buttons/edit";
import { faDownload, faWrench } from "@fortawesome/free-solid-svg-icons";
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
				<CustomButton
					color="success"
					title="Download"
					onClick={() => {
						window.location.href = getDownloadUrl();
					}}
					icon={faDownload}
				/>
				{payload && payload.compiled && (
					<CustomButton
						color="info"
						title="Recompile"
						onClick={recompileStager}
						icon={faWrench}
					/>

				)}
				<EditButton onClick={showEditModal} />
				<DeleteButton onClick={deleteStager} />
			</td>
		</tr>
	);
}
