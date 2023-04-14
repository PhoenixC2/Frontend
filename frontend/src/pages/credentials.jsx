import { useEffect, useState } from "react";
import request from "../logic/api";

export default function Credentials(props) {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    async function getCredentials() {
      const response = await request("credentials");
      const credentialsData = await response.json();
      setCredentials(credentialsData.credentials);
    }
    getCredentials();
    const interval = setInterval(getCredentials, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Value</th>
            <th>Admin Access</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {credentials &&
            credentials.map((credential) => (
              <tr className="dark-background" key={credential.id}>
                <td>{credential.id}</td>
                <td>{credential.user ? credential.user : "None"}</td>
                <td>{credential.value}</td>
                <td>{credential.admin ? "✅" : "❌"}</td>
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
          {!credentials && (
            <tr className="dark-background">
              <td colSpan="9">No credentials found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
