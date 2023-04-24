import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [unseenLogs, setUnseenLogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await request("logs/unseen?user=true");
      const logsData = await response.json();
      setUnseenLogs(logsData.logs);
    }

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  async function readLogs() {
    const response = await request("logs/read");
    const body = await response.json();
    if (response.status == 200) {
      showNotification("All notifications marked as read", "success");
      setUnseenLogs([]);
    } else {
      showNotification(body.message, "danger");
    }
  }

  return (
    <>
      {unseenLogs && (
        <li className="nav-item dropdown">
          <a
            className="nav-link"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="material-icons">notifications</i>
            <span className="notification">{unseenLogs.length}</span>
            <p className="d-lg-none d-md-block">Notifications</p>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdownMenuLink"
          >
            {unseenLogs.length == 0 && (
              <p className="dropdown-item">No new notifications</p>
            )}
            {/* show the last 10 logs if there are more than 10 */}
            {unseenLogs.length > 10 && (
              <>
              {unseenLogs.slice(0, 10).map((log) => (
              <Message key={log.id} log={log} />
              ))}
              </>
            )}
            {/* show all logs if there are less than 10 */}
            {unseenLogs.length <= 10 && (
              <>
              {unseenLogs.map((log) => (
              <Message key={log.id} log={log} />
              ))}
              </>
            )}
            {unseenLogs.length > 0 && (
              <>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item text-warning" onClick={readLogs}>
                  Mark all as read
                </a>
              </>
            )}
          </div>
        </li>
      )}
    </>
  );
}
