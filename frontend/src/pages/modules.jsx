import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../logic/api";

export default function Modules(props) {
	const {
		data: modules,
		isLoading,
		isError,
	} = useQuery(["modules"], async () => {
		const data = await getData("modules/?full=true");
		return data.modules;
	});

	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Language</th>
						<th>Admin required</th>
					</tr>
				</thead>
				<tbody>
					{modules &&
						modules.map((module) => (
							<tr className="dark-background" key={module.name}>
								<td>{module.name}</td>
								<td>{module.description}</td>
								<td>{module.language}</td>
								<td>{module.enabled ? "✅" : "❌"}</td>
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
	);
}
