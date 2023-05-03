import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLinux,
	faWindows,
	faApple,
} from "@fortawesome/free-brands-svg-icons";

import { getData } from "../logic/api";
import Modal from "../components/modal";

function ModuleInfo(props) {
	const module = props.module;

	return (
		<div>
			<p>{module.description}</p>
			<p>Admin required: {module.enabled ? "✅" : "❌"}</p>
			<p>Language: {module.language}</p>
			<p>
				Supported OS:{" "}
				{module.os.map((os) => {
					switch (os) {
						case "linux":
							return (
								<>
									<FontAwesomeIcon title="Linux" icon={faLinux} />{" "}
								</>
							);
						case "windows":
							return (
								<>
									<FontAwesomeIcon title="Windows" icon={faWindows} />{" "}
								</>
							);
						case "osx":
							return (
								<>
									<FontAwesomeIcon title="OSX" icon={faApple} />{" "}
								</>
							);
						default:
							return os;
					}
				})}
			</p>
			<p>Author: {module.author}</p>
		</div>
	);
}
export default function Modules(props) {
	const [activeModule, setActiveModule] = useState(null);
	const [show, setShow] = useState(false);

	const {
		data: modules,
		isLoading,
		isError,
	} = useQuery(["modules"], async () => {
		const data = await getData("modules/?full=true");
		return data.modules;
	});

	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Language</th>
							<th>Admin required</th>
							<th>More info</th>
						</tr>
					</thead>
					<tbody>
						{modules &&
							modules.map((module) => (
								<tr
									className="dark-background"
									key={module.name}
								>
									<td>{module.name}</td>
									<td>{module.description}</td>
									<td>{module.language}</td>
									<td>{module.enabled ? "✅" : "❌"}</td>
									<td>
										<button
											className="btn btn-success"
											onClick={() => {
												setActiveModule(module);
												setShow(true);
											}}
										>
											Show more info
										</button>
									</td>
								</tr>
							))}
						{isLoading && (
							<tr className="dark-background">
								<td className="text-warning" colSpan="4">
									Loading...
								</td>
							</tr>
						)}
						{isError && (
							<tr className="dark-background">
								<td className="text-danger" colSpan="4">
									Error fetching modules
								</td>
							</tr>
						)}
						{modules && modules.length === 0 && (
							<tr className="dark-background">
								<td className="text-warning" colSpan="9">
									No modules found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{activeModule && (
				<Modal
					title={activeModule.name}
					body={<ModuleInfo module={activeModule} />}
					show={show}
					setShow={setShow}
				/>
			)}
		</>
	);
}
