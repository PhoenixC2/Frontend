import { useQuery } from "@tanstack/react-query";
import { getData } from "../logic/api";
import { get } from "jquery";

export default function Credentials(props) {

  const {data: credentials, isLoading, isError} = useQuery(["credentials"], async () => {
    const data = await getData("credentials/");
    return data.credentials;
  }, {
    refetchInterval: 10000,
  });

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
          {isLoading && (
            <tr className="dark-background">
              <td className="text-warning" colSpan="9">Loading...</td>
            </tr>
          )}
          {isError && (
            <tr className="dark-background">
              <td className="text-danger" colSpan="5">Error fetching credentials</td>
            </tr>
          )}
          {credentials && credentials.length === 0 && (
            <tr className="dark-background">
              <td className="text-warning" colSpan="5">No credentials found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
