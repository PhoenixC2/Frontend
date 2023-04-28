import { useQuery } from "@tanstack/react-query";
import { icons } from "../components/frame/sidebar";
import showNotification from "../logic/notify";
import request, { getData } from "../logic/api";
import UserRender from "../components/user";

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
      const data = await getData("logs/?user=true");
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
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {logs &&
              logs.map((log) => (
                <tr
                  className="dark-background"
                  key={log.id}
                >
                  <td className="text-center">{log.id}</td>
                  <td
                    data-toggle="tooltip"
                    data-placement="top"
                    title={log.endpoint}
                  >
                    <i className="material-icons" aria-label="Endpoint">
                      {icons[log.endpoint]}
                    </i>
                  </td>
                  <td className={`text-${log.status}`}>{log.description}</td>
                  <td>{log.time}</td>
                  <td>{log.user.username ? <UserRender user={log.user} /> : log.user}</td>
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
                <td className="text-warning" colSpan="6">
                  Loading...
                </td>
              </tr>
            )}
            {isError && (
              <tr className="dark-background">
                <td className="text-danger" colSpan="6">
                  Error fetching logs
                </td>
              </tr>
            )}
            {logs && logs.length === 0 && (
              <tr className="dark-background">
                <td className="text-warning" colSpan="6">
                  No Logs found
                </td>
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
