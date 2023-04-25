import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../logic/api";
export default function DashBoard() {

  const {
    data: dashboard,
  } = useQuery(["dashboard"], async () => getData("dashboard"), {
    refetchInterval: 10000,
  });

  const {
    isLoading: devicesLoading,
    isError: devicesError,
    data: devices,
  } = useQuery(
    ["devices"],
    async () => {
      const data = await getData("devices/");
      return data.devices;
    },
    {
      refetchInterval: 10000,
    }
  );

  const {
    isLoading: tasksLoading,
    isError: tasksError,
    data: tasks,
  } = useQuery(
    ["tasks"],
    async () => {
      const data = await getData("tasks/?device=true");
      return data.tasks;
    },
    {
      refetchInterval: 10000,
    }
  );

  return (
    dashboard && (
      <>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header card-header-warning card-header-icon">
                <div className="card-icon">
                  <i className="material-icons">dns</i>
                </div>
                <p className="card-category">Connected devices</p>
                <h3 className="card-title">{dashboard.active_devices}</h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">open_in_new</i>
                  <Link className="text-warning" to="/devices">
                    Manage devices
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header card-header-danger card-header-icon">
                <div className="card-icon">
                  <i className="material-icons">earbuds</i>
                </div>
                <p className="card-category">Active listeners</p>
                <h3 className="card-title">{dashboard.active_listeners}</h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">open_in_new</i>
                  <Link className="text-warning" to="/listeners">
                    Manage Listeners
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header card-header-success card-header-icon">
                <div className="card-icon">
                  <i className="material-icons">group</i>
                </div>
                <p className="card-category">Users active</p>
                <h3 className="card-title">{dashboard.active_users}</h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">open_in_new</i>
                  <Link className="text-warning" to="/users">
                    Manage users
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header card-header-info card-header-icon">
                <div className="card-icon">
                  <i className="material-icons">route</i>
                </div>
                <p className="card-category">Connections last hour</p>
                <h3 className="card-title">
                  {dashboard.connections_last_hour}
                </h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  Connections today: {dashboard.connections_today}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="card">
              <div className="card-header card-header-warning">
                <h4 className="card-title">Devices</h4>
              </div>
              <div className="card-body table-responsive">
                <table className="table table-hover">
                  <thead className="text-warning">
                    <tr>
                      <th>ID</th>
                      <th>Hostname</th>
                      <th>Address</th>
                      <th>Connected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices && devices.map((device) => (
                      <tr key={device.id}>
                        <td>{device.id}</td>
                        <td>{device.hostname}</td>
                        <td>{device.address}</td>
                        <td>{device.connected ? "✅" : "❌"}</td>
                      </tr>
                    ))}
                    {devicesLoading && (
                      <tr>
                        <td className="text-warning" colSpan="4">Loading...</td>
                      </tr>
                    )}
                    {devicesError && (
                      <tr>
                        <td className="text-danger" colSpan="4">Error fetching devices</td>
                      </tr>
                    )}
                    {devices && devices.length === 0 && (
                      <tr>
                        <td className ="text-warning" colSpan="4">No devices found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="card">
              <div className="card-header card-header-warning">
                <h4 className="card-title">Tasks</h4>
              </div>
              <div className="card-body table-responsive">
                <table className="table table-hover">
                  <thead className="text-warning">
                    <tr>
                      <th>ID</th>
                      <th>Device</th>
                      <th>Type</th>
                      <th>Success</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks &&
                      tasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.id}</td>
                          <td>{task.device}</td>
                          <td>{task.type}</td>
                          <td>{task.success ? "✅" : "❌"}</td>
                          <td>{task.created}</td>
                        </tr>
                      ))}
                    {tasksLoading && (
                      <tr>
                        <td className="text-warning" colSpan="5">Loading...</td>
                      </tr>
                    )}
                    {tasksError && (
                      <tr>
                        <td className="text-danger" colSpan="5">Error fetching tasks</td>
                      </tr>
                    )}
                    {tasks && tasks.length === 0 && (
                      <tr>
                        <td className="text-warning" colSpan="5">No tasks found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {dashboard.active_listeners === 0 && (
          <div className="card card-nav-tabs">
            <div className="card-header card-header-warning">Suggestion</div>
            <div className="card-body">
              <h4 className="card-title">
                Create or start your first listener.
              </h4>
              <a href="/listeners" className="btn btn-danger">
                Create listener
              </a>
            </div>
          </div>
        )}
      </>
    )
  );
}
