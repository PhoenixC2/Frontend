import { useEffect, useState } from "react";
import request from "../../logic/api";
import Cookies from "js-cookie";
import UserRender from "../../components/user";
import { getPictureUrl } from "../../logic/operations";

export default function Operations(props) {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    async function getOperations() {
      const response = await request("operations?owner=true&assigned=true");
      const operationsData = await response.json();
      setOperations(operationsData.operations);
    }
    getOperations();
    const interval = setInterval(getOperations, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Assigned Users</th>
            <th>Expiry</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {operations.length > 0 &&
            operations.map((operation) => (
              <tr className="dark-background" key={operation.id}>
                <td>{operation.id}</td>
                <td>
                  <img
                    className="profile-picture"
                    src={getPictureUrl(operation.id)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/icon.png";
                    }}
                  />
                </td>
                <td>{operation.name}</td>
                <td>
                  {operation.description.substring(0, 30) +
                    (operation.description.length > 30 ? "..." : "")}
                </td>
                <td>
                  <UserRender user={operation.owner} />
                </td>
                <td>
                  {operation.users.map((user) => (
                    <span key={user.id}>
                      <UserRender user={user} />
                    </span>
                  ))}
                </td>
                <td>{operation.expiry}</td>
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
          {operations.length === 0 && (
            <tr className="dark-background">
              <td colSpan="9">No operations found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
