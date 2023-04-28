import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../logic/api";

export default function ModuleBrowser(props) {
	// module browser to search for modules and set them using setModule from the props
	const [search, setSearch] = useState("");
	const [device, setDevice] = useState(props.device);
	let filteredModules = [];
	useEffect(() => {
		setDevice(props.device);
	}, [props.device]);

	const {
		data: modules,
		isError,
		isLoading,
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
		<div className="container border border-warning">
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
								className="card dark-background"
								key={module.id}
								onClick={() => props.setModule(module)}
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
						<div className="card dark-background">
							<p className="text-danger">No modules found</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
