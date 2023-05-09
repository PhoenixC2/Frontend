import { useQuery } from "@tanstack/react-query";
import UserRender from "../../components/user";
import { getPictureUrl } from "../../logic/operations";
import { getData } from "../../logic/api";

export default function Operations(props) {
  const {
    data: operations,
    isLoading,
    isError,
  } = useQuery(
    ["operations"],
    async () => {
      const data = await getData("operations/?owner=true&assigned=true");
      return data.operations;
    },
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th className="text-center">ID</th>
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
          {operations &&
            operations.length > 0 &&
            operations.map((operation) => (
              <tr key={operation.id}>
                <td className="text-center">{operation.id}</td>
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
          {isLoading && (
            <tr>
              <td className="text-warning" colSpan="9">Loading...</td>
            </tr>
          )}
          {isError && (
            <tr>
              <td className="text-danger" colSpan="9">Error fetching operations</td>
            </tr>
          )}
          {operations && operations.length === 0 && (
            <tr>
              <td className="text-warning" colSpan="9">No operations found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
