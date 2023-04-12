import { useState, useEffect } from "react";
import request from "../logic/api";
import {Link} from "react-router-dom";
export default function DashBoard() {
  const [activeDevices, setActiveDevices] = useState([]);
  const [activeListeners, setActiveListeners] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [connectionsLastHour, setConnectionsLastHour] = useState(0);
  const [connectionsToday, setConnectionsToday] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await request("dashboard", "GET");
      const dashboardData = await response.json();
      setActiveDevices(dashboardData["active_devices"]);
      setActiveListeners(dashboardData["active_listeners"]);
      setActiveUsers(dashboardData["active_users"]);
      setConnectionsLastHour(dashboardData["connections_last_hour"]);
      setConnectionsToday(dashboardData["connections_today"]);
    }
    if (!activeUsers) {
      fetchData(); // There's always one user active, so this will only run once
    }
  }, [activeUsers]);

  return (
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
    );
}
