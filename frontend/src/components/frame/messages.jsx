import { Link } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import request from "../../logic/api";
import showNotification from "../../logic/notify";

function Message(props) {
  const log = props.log;
  return (
    <Link className={"dropdown-item text-" + log.status} to={"/logs/" + log.id}>
      {log.user.username ? log.user.username : log.user}: {log.description}
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
  const { isLoading, isError, data: messages } = useQuery(["unseen"], fetchData, {
    refetchInterval: 3000,
  });

  return (
      <li className="nav-item dropdown">
        <a
          className="nav-link"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="material-icons">notifications</i>
          <span className="notification">{messages ? messages.length : 0}</span>
          <p className="d-lg-none d-md-block">Notifications</p>
        </a>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdownMenuLink"
        >
          {isLoading && <p className="dropdown-item text-warning">Loading...</p>}
          {isError && <p className="dropdown-item text-danger" >Error</p>}
          {messages && (
            <>
              {messages.length == 0 && (
                <p className="dropdown-item">No new notifications</p>
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
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-warning" onClick={readLogs}>
                    Mark all as read
                  </a>
                </>
              )}
            </>
          )}
        </div>
      </li>
  );
}
