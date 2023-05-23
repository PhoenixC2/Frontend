import { useQuery } from "@tanstack/react-query";

import { getData } from "../../logic/api";
import Operation from "./operation";

export default function Operations(props) {
	const {
		data: operations,
		isLoading,
		isError,
	} = useQuery(
		["operations"],
		async () => {
			const data = await getData("operations/?owner=true&assigned=true");
			return data.operations;
		},
		{
			refetchInterval: 10000,
		}
	);

	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th className="text-center">ID</th>
						<th>Picture</th>
						<th>Name</th>
						<th>Description</th>
						<th>Owner</th>
						<th>Assigned Users</th>
						<th>Expiry</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					{operations &&
						operations.length > 0 &&
						operations.map((operation) => (
							<Operation operation={operation} />
						))}
					{isLoading && (
						<tr>
							<td className="text-warning" colSpan="9">
								Loading...
							</td>
						</tr>
					)}
					{isError && (
						<tr>
							<td className="text-danger" colSpan="9">
								Error fetching operations
							</td>
						</tr>
					)}
					{operations && operations.length === 0 && (
						<tr>
							<td className="text-warning" colSpan="9">
								No operations found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
