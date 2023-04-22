import { useEffect, useState } from "react";
import request from "../../logic/api";

export default function Stagers(props) {
  const [stagers, Stagers] = useState([]);

  useEffect(() => {
    async function getStagers() {
      const response = await request("stagers?listener=true");
      const stagersData = await response.json();
      Stagers(stagersData.stagers);
    }
    getStagers();
    const interval = setInterval(getStagers, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Listener</th>
            <th>Type</th>
            <th>Payload</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stagers &&
            stagers.map((stager) => (
              <tr className="dark-background" key={stager.id}>
                <td>{stager.id}</td>
                <td>{stager.name}</td>
                <td>{stager.listener.name}</td>
                <td>{stager.listener.type}</td>
                <td>{stager.payload}</td>
                <td>
                  <button type="button" className="btn btn-warning">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {stagers.length === 0 && (
            <tr className="dark-background">
              <td colSpan="9">No stagers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
