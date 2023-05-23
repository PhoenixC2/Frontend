import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Modal from "../../components/modal";
import { getData } from "../../logic/api";
import ModuleInfo from "./info";
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
								<tr key={module.name}>
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
							<tr>
								<td className="text-warning" colSpan="4">
									Loading...
								</td>
							</tr>
						)}
						{isError && (
							<tr>
								<td className="text-danger" colSpan="4">
									Error fetching modules
								</td>
							</tr>
						)}
						{modules && modules.length === 0 && (
							<tr>
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
