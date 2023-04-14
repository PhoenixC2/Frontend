import { useEffect, useState } from "react";
import request from "../logic/api";
import { icons } from "../components/frame/sidebar";

export default function Logs(props) {
  const [logs, setLogs] = useState([]);

  async function getLogs() {
    const response = await request("logs?user=true");
    const logsData = await response.json();
    setLogs(logsData.logs);
  }

  useEffect(() => {
    getLogs();
    const interval = setInterval(getLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  async function clearLog(id) {
    await request(`logs/${id}/clear`, "DELETE");
    await getLogs();
  }

  return (
    <>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Endpoint</th>
            <th>Description</th>
            <th>Time</th>
            <th>Triggered By</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {logs &&
            logs.map((log) => (
              <tr className="dark-background" key={log.id}>
                <td>{log.id}</td>
                <td>{log.status}</td>
                <td data-toggle="tooltip" data-placement="top" title={log.endpoint}>
                  <i className="material-icons" aria-label="Endpoint">
                    {icons[log.endpoint]}
                  </i>
                </td>
                <td>{log.description}</td>
                <td>{log.time}</td>
                <td>{log.user.username || "N/A"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => clearLog(log.id)}
                  >
                    Clear
                  </button>
                </td>
              </tr>
            ))}
          {!logs && (
            <tr className="dark-background">
              <td colSpan="9">No Logs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    {logs && logs.length > 0 && (
    <button className="btn btn-danger" onClick={() => clearLog("all")}>
      Clear all logs
    </button>
    )}
    </>
  );
}
