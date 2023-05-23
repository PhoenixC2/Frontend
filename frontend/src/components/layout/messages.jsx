import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import { NavItem, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell} from "@fortawesome/free-solid-svg-icons";
function Message(props) {
	const log = props.log;
	return (
		<Link
			className={"dropdown-item text-" + log.status}
			to={"/logs/" + log.id}
		>
			{log.user.username ? log.user.username : log.user}:{" "}
			{log.description}
		</Link>
	);
}

export default function MessageDropdown(props) {
	async function fetchData() {
		const response = await request("logs/unseen?user=true");
		const logsData = await response.json();
		return logsData.logs;
	}

	async function readLogs() {
		const response = await request("logs/read");
		const body = await response.json();
		if (response.status == 200) {
			showNotification("All notifications marked as read", "success");
		} else {
			showNotification(body.message, "danger");
		}
	}
	const {
		isLoading,
		isError,
		data: messages,
	} = useQuery(["unseen"], fetchData, {
		refetchInterval: 3000,
	});

	return (
		<NavItem>
			<Dropdown>
				<a
					className="nav-link"
					id="navbarDropdownMenuLink"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<FontAwesomeIcon icon={faBell} size="lg" />
					<span className="notification">
						{messages ? messages.length : 0}
					</span>
					<p className="d-lg-none d-md-block">Notifications</p>
				</a>
				<div
					className="dropdown-menu dropdown-menu-right"
					aria-labelledby="navbarDropdownMenuLink"
				>
					{isLoading && (
						<Dropdown.Item className="text-warning">Loading...</Dropdown.Item>
					)}
					{isError && (
						<Dropdown.Item className="text-danger">Error</Dropdown.Item>
					)}
					{messages && (
						<>
							{messages.length == 0 && (
								<Dropdown.Item>
									No new notifications
								</Dropdown.Item>
							)}
							{messages.length > 10 && (
								<>
									{messages.slice(0, 10).map((log) => (
										<Message key={log.id} log={log} />
									))}
								</>
							)}
							{messages.length <= 10 && (
								<>
									{messages.map((log) => (
										<Message key={log.id} log={log} />
									))}
								</>
							)}
							{messages.length > 0 && (
								<>
									<Dropdown.Divider />
									<Dropdown.Item
										className="dropdown-item text-warning"
										onClick={readLogs}
									>
										Mark all as read
									</Dropdown.Item>
								</>
							)}
						</>
					)}
				</div>
			</Dropdown>
		</NavItem>
	);
}
