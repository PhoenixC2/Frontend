import { useQuery } from "@tanstack/react-query";
import { icons } from "../components/layout/sidebar";
import showNotification from "../logic/notify";
import request, { getData } from "../logic/api";
import UserRender from "../components/user";
import DeleteButton from "../components/buttons/delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Logs(props) {
	async function clearLog(id) {
		const response = await request(`logs/${id}/clear`, "DELETE");
		const body = await response.json();
		showNotification(body.message, body.status);
	}

	const {
		data: logs,
		isLoading,
		isError,
	} = useQuery(
		["logs"],
		async () => {
			const data = await getData("logs/?user=true&unseen=true");
			return data.logs;
		},
		{
			refetchInterval: 10000,
		}
	);
	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th className="text-center">ID</th>
							<th>Endpoint</th>
							<th>Description</th>
							<th>Time</th>
							<th>Triggered By</th>
							<th>Not read by</th>
							<th>Manage</th>
						</tr>
					</thead>
					<tbody>
						{logs &&
							logs.map((log) => (
								<tr key={log.id}>
									<td className="text-center">{log.id}</td>
									<td
										data-toggle="tooltip"
										data-placement="top"
										title={log.endpoint}
									>
										<i
											className="material-icons"
											aria-label="Endpoint"
										>
											<FontAwesomeIcon
												icon={icons[log.endpoint]}
											/>
										</i>
									</td>
									<td className={`text-${log.status}`}>
										{log.description}
									</td>
									<td>{log.time}</td>
									<td>
										{log.user.username ? (
											<UserRender user={log.user} />
										) : (
											log.user
										)}
									</td>
									<td>
										{log.unseen_users.length != 0 ? (
											<>
												{log.unseen_users.map(
													(user) => (
														<UserRender
															user={user}
														/>
													)
												)}
											</>
										) : (
											<>Read by everyone</>
										)}
									</td>
									<td>
										<DeleteButton
											title="Clear"
											onClick={() => clearLog(log.id)}
										/>
									</td>
								</tr>
							))}
						{isLoading && (
							<tr>
								<td className="text-warning" colSpan="6">
									Loading...
								</td>
							</tr>
						)}
						{isError && (
							<tr>
								<td className="text-danger" colSpan="6">
									Error fetching logs
								</td>
							</tr>
						)}
						{logs && logs.length === 0 && (
							<tr>
								<td className="text-warning" colSpan="6">
									No Logs found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{logs && logs.length > 0 && (
				<DeleteButton
					title="Clear All"
					onClick={() => clearLog("all")}
				/>
			)}
		</>
	);
}
