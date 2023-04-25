import { useQuery } from "@tanstack/react-query";
import { icons } from "../components/frame/sidebar";
import showNotification from "../logic/notify";
import request, { getData } from "../logic/api";

export default function Logs(props) {

  async function clearLog(id) {
    const response = await request(`logs/${id}/clear`, "DELETE");
    const body = await response.json();
    showNotification(body.message, body.status);
  }

  const {data: logs, isLoading, isError} = useQuery(["logs"], async () => {
    const data = await getData("logs/?user=true");
    return data.logs;
  }, {
    refetchInterval: 10000,
  });
  console.log(logs);
  return (
    <>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
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
              <tr className={`dark-background alert-${log.status}`} key={log.id}>
                <td>{log.id}</td>
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
          {isLoading && (
            <tr className="dark-background">
              <td className="text-warning" colSpan="6">Loading...</td>
            </tr>
          )}
          {isError && (
            <tr className="dark-background">
              <td className="text-danger" colSpan="6">Error fetching logs</td>
            </tr>
          )}
          {logs && logs.length === 0 && (
            <tr className="dark-background">
              <td className="text-warning" colSpan="6">No Logs found</td>
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
