import request from "../../logic/api";
import showNotification from "../../logic/notify";

export function ExecuteCommand(props) {
	async function executeCommand(event) {
		event.preventDefault();
		const postData = {
			cmd: event.target.command.value,
		};
		const response = await request(
			`devices/${props.device.id}/rce`,
			"POST",
			postData
		);
		const data = await response.json();
		showNotification(data.message, data.status);
		props.setActiveTask(data.task);
	}
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col">
						<h3 className="text-primary">Execute Command</h3>
						<form onSubmit={executeCommand}>
							<div className="form-group">
								<label htmlFor="command">Command</label>
								<input
									type="text"
									className="form-control"
									id="command"
									placeholder="Command"
								/>
								<span className="form-text text-muted">
									The command to execute on the device.
								</span>
							</div>
							<button type="submit" className="btn btn-primary">
								Execute
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export function ReverseShell(props) {
	async function startReverseShell(event) {
		event.preventDefault();
		const postData = {
			address: event.target.address.value,
			port: event.target.port.value,
		};
		const response = await request(
			`devices/${props.device.id}/reverse_shell`,
			"POST",
			postData
		);
		const data = await response.json();
		showNotification(data.message, data.status);
		props.setActiveTask(data.task);
	}
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col">
						<h3 className="text-primary">Reverse Shell</h3>
						<form onSubmit={startReverseShell}>
							<div className="form-group">
								<label htmlFor="address">Address</label>
								<input
									type="text"
									className="form-control"
									id="address"
									placeholder="Address"
								/>
								<span className="form-text text-muted">
									The address of the server to connect to.
								</span>
							</div>
							<div className="form-group">
								<label htmlFor="port">Port</label>
								<input
									type="text"
									className="form-control"
									id="port"
									placeholder="Port"
								/>
								<span className="form-text text-muted">
									The port of the server to connect to.
								</span>
							</div>
							<button type="submit" className="btn btn-primary">
								Start
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export function DownloadFile(props) {
	async function downloadFile(event) {
		event.preventDefault();
		const response = await request(
			`devices/${props.device.id}/download?path=${event.target.path.value}`,
			"GET"
		);
		const data = await response.json();
		showNotification(data.message, data.status);
		props.setActiveTask(data.task);
	}
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col">
						<h3 className="text-primary">Download File</h3>
						<form onSubmit={downloadFile}>
							<div className="form-group">
								<label htmlFor="path">Path</label>
								<input
									type="text"
									className="form-control"
									id="path"
									placeholder="Path"
								/>
								<span className="form-text text-muted">
									The path of the file to download.
								</span>
							</div>
							<button type="submit" className="btn btn-primary">
								Download
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export function UploadFile(props) {
	async function uploadFile(event) {
		event.preventDefault();

		const response = await fetch(`/api/devices/${props.device.id}/upload?path=${event.target.path.value}`, {
			method: "POST",
			body: event.target.file.files[0],
		});
		const data = await response.json();
		showNotification(data.message, data.status);
		props.setActiveTask(data.task);
	}
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col">
						<h3 className="text-primary">Upload File</h3>
						<form onSubmit={uploadFile}>
							<div className="form-group">
								<label htmlFor="path">Path</label>
								<input
									type="text"
									className="form-control"
									id="path"
									placeholder="Path"
								/>
								<span className="form-text text-muted">
									The path where the file will be stored.
								</span>
							</div>
							<div className="form-group">
								<label htmlFor="file">File</label>
								<input
									type="file"
									className="form-control-file"
									id="file"
								/>
								<span className="form-text text-muted">
									The file to upload.
								</span>
							</div>
							<button type="submit" className="btn btn-primary">
								Upload
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
