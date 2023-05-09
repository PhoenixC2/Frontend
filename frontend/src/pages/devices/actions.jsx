import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import request, { uploadFile, getData } from "../../logic/api";
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
	async function upload(event) {
		event.preventDefault();

		const response = await uploadFile(
			`devices/${props.device.id}/upload?path=${event.target.path.value}`,
			event.target.file.files[0]
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
						<h3 className="text-primary">Upload File</h3>
						<form onSubmit={upload}>
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

export function ModuleBrowser(props) {
	// module browser to search for modules and set them using setModule from the props
	const [search, setSearch] = useState("");
	const [device, setDevice] = useState(props.device);
	let filteredModules = [];
	useEffect(() => {
		setDevice(props.device);
	}, [props.device]);

	const {
		data: modules,
		isLoading,
		isError,
	} = useQuery(["modules"], async () => {
		const data = await getData("modules/?full=true");
		return data.modules;
	});

	// use bootstrap 4 to make a search bar
	if (modules !== undefined) {
		filteredModules = modules.filter((module) =>
			module.name.toLowerCase().includes(search.toLowerCase())
		);
	}

	return (
		<div className="container">
			<h3 className="text-primary">Module Browser</h3>
			<div className="row">
				<div className="col">
					<input
						type="text"
						className="form-control"
						placeholder="Search"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					{isLoading && <p className="text-warning">Loading...</p>}
					{isError && (
						<p className="text-danger">Error fetching modules</p>
					)}
					{modules &&
						filteredModules.map((module) => (
							<div
								className="card"
								key={module.id}
							>
								<div className="card-body" key={module.id}>
									<h5 className="card-title text-primary">
										{module.name}
									</h5>
									<p className="card-text">
										{module.description}
									</p>
									<p className="card-text">
										Language: {module.language}
									</p>
									{/* show warning if device os is not supported */}
									{device &&
										!module.os.includes(device.os) && (
											<p className="card-text text-danger">
												This module is not supported on{" "}
												{device.os}
											</p>
										)}
									<div className="float-right">
										<button
											className="btn btn-primary"
											onClick={() =>
												props.setModule(module)
											}
										>
											Use
										</button>
									</div>
									{/* show author on bottom of card */}
									<p className="card-text">
										Created by: {module.author}
									</p>
								</div>
							</div>
						))}
					{!modules && <p>No modules found</p>}
					{!filteredModules.length && (
						<div className="card">
							<p className="text-danger">No modules found</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
