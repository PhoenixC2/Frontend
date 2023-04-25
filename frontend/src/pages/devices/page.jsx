import { useQuery } from "@tanstack/react-query";
import { getData } from "../../logic/api";

export default function Devices(props) {
  function clearDevice(id) {
    async function clear() {
      const response = await request(`devices/${id}/clear`, "POST");
      if (response.status === 200) {
        setDevices(devices.filter((device) => device.id !== id));
      }
    }
    clear();
  }

  const { data: devices, isLoading, isError } = useQuery(
    ["devices"],
    async () => {
      const data = await getData("devices/");
      return data.devices;
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
                  <td className="text-center">{device.id}</td>
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
            {isLoading && (
              <tr className="dark-background">
                <td className="text-warning" colSpan="11">Loading...</td>
              </tr>
            )}
            {isError && (
              <tr className="dark-background">
                <td className="text-danger" colSpan="11">Error fetching devices</td>
              </tr>
            )}
            {devices && devices.length === 0 && (
              <tr className="dark-background">
                <td className="text-warning" colSpan="11">No devices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
