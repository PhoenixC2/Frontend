import { useState, useEffect } from "react";
import request from "../logic/api";
import { Link } from "react-router-dom";
export default function DashBoard() {
  const [activeDevices, setActiveDevices] = useState([]);
  const [activeListeners, setActiveListeners] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [connectionsLastHour, setConnectionsLastHour] = useState(0);
  const [connectionsToday, setConnectionsToday] = useState(0);
  const [devices, setDevices] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // fetch stats
      const statsResponse = await request("dashboard");
      const dashboardData = await statsResponse.json();
      setActiveDevices(dashboardData["active_devices"]);
      setActiveListeners(dashboardData["active_listeners"]);
      setActiveUsers(dashboardData["active_users"]);
      setConnectionsLastHour(dashboardData["connections_last_hour"]);
      setConnectionsToday(dashboardData["connections_today"]);

      // fetch devices
      const devicesResponse = await request("devices");
      const devicesData = await devicesResponse.json();
      setDevices(devicesData["devices"]);

      // fetch tasks
      const tasksResponse = await request("tasks?device=true");
      const tasksData = await tasksResponse.json();
      setTasks(tasksData["tasks"]);
    }
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-warning card-header-icon">
              <div className="card-icon">
                <i className="material-icons">dns</i>
              </div>
              <p className="card-category">Connected devices</p>
              <h3 className="card-title">{activeDevices}</h3>
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
              <h3 className="card-title">{activeListeners}</h3>
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
              <h3 className="card-title">{activeUsers}</h3>
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
              <h3 className="card-title">{connectionsLastHour}</h3>
            </div>
            <div className="card-footer">
              <div className="stats">Connections today: {connectionsToday}</div>
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
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td>{device.id}</td>
                      <td>{device.hostname}</td>
                      <td>{device.address}</td>
                      <td>{device.connected ? "✅" : "❌"}</td>
                    </tr>
                  ))}
                  {devices.length === 0 && (
                    <tr>
                      <td colSpan="4">No devices found</td>
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
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.device}</td>
                      <td>{task.type}</td>
                      <td>{task.success ? "✅" : "❌"}</td>
                      <td>{task.created}</td>
                    </tr>
                  ))}
                  {tasks.length === 0 && (
                    <tr>
                      <td colSpan="5">No tasks found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {activeListeners === 0 && (
        <div className="card card-nav-tabs">
          <div className="card-header card-header-warning">Suggestion</div>
          <div className="card-body">
            <h4 className="card-title">Create or start your first listener.</h4>
            <a href="/listeners" className="btn btn-danger">
              Create listener
            </a>
          </div>
        </div>
      )}
    </>
  );
}
