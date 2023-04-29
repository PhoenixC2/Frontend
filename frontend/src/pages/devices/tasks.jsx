import { useState, useEffect } from "react";

export default function TasksTable(props) {
	const [tasks, setTasks] = useState(props.data);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setTasks(props.data);
		setIsLoading(props.isLoading);
		setIsError(props.isError);
	}, [props]);

	return (
		<div className="card-body table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th className="text-center">ID</th>
						<th>Name</th>
						<th>Action</th>
						<th>Success</th>
					</tr>
				</thead>
				<tbody>
					{tasks &&
						tasks.slice(0, 6).map((task) => (
							<tr key={task.id}>
								<td className="text-center">{task.id}</td>
								<td>{task.name}</td>
								<td>{task.action}</td>
								<td>{task.success ? "✅" : "❌"}</td>
							</tr>
						))}
					{isLoading && (
						<tr>
							<td className="text-warning" colSpan="5">
								Loading...
							</td>
						</tr>
					)}
					{isError && (
						<tr>
							<td className="text-danger" colSpan="5">
								Error fetching tasks
							</td>
						</tr>
					)}
					{tasks && tasks.length > 0 && (
						<tr>
							<td className="text-warning" colSpan="5">
								Showing {tasks.slice(0, 6).length} of{" "}
								{tasks.length} tasks
							</td>
						</tr>
					)}
					{tasks && tasks.length === 0 && (
						<tr>
							<td className="text-warning" colSpan="5">
								No tasks found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
