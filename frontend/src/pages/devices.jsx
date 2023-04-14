import { useEffect, useState } from "react";
import request from "../logic/api";

export default function Devices(props) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function getDevices() {
      const response = await request("devices");
      const devicesData = await response.json();
      setDevices(devicesData.devices);
    }
    getDevices();
    const interval = setInterval(getDevices, 10000);
    return () => clearInterval(interval);
  }, []);

  function clearDevice(id) {
    async function clear() {
      const response = await request(`devices/${id}/clear`, "POST");
      if (response.status === 200) {
        setDevices(devices.filter((device) => device.id !== id));
      }
    }
    clear();
  }
  
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Active</th>
              <th>Name</th>
              <th>Hostname</th>
              <th>Address</th>
              <th>Os</th>
              <th>Architecture</th>
              <th>User</th>
              <th>Last Online</th>
              <th>Connection Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices &&
              devices.map((device) => (
                
                <tr className="dark-background" key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.connected ? "✅" : "❌"}</td>
                  <td>{device.name}</td>
                  <td>{device.hostname}</td>
                  <td>{device.address}</td>
                  <td>{device.os}</td>
                  <td>{device.architecture}</td>
                  <td>{device.user}</td>
                  <td>{device.last_online}</td>
                  <td>{device.connection_time}</td>
                  <td>
                    <button type="button" className="btn btn-warning">
                      Manage
                    </button>
                    <button type="button" className="btn btn-danger">
                      Clear
                    </button>
                  </td>
                </tr>
              ))}
            {!devices && (
              <tr className="dark-background">
                <td colSpan="9">No devices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
