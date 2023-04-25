import { useQuery } from "@tanstack/react-query";
import { getData } from "../../logic/api";

export default function Stagers(props) {
  const {
    data: stagers,
    isLoading,
    isError,
  } = useQuery(
    ["stagers"],
    async () => {
      const data = await getData("stagers/");
      return data.stagers;
    },
    { refetchInterval: 10000 }
  );
  return (
    <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th className="text-center">ID</th>
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
                <td className="text-center">{stager.id}</td>
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
          {isLoading && (
            <tr className="dark-background">
              <td className="text-warning" colSpan="9">
                Loading...
              </td>
            </tr>
          )}
          {isError && (
            <tr className="dark-background">
              <td className="text-danger" colSpan="9">
                Error fetching stagers
              </td>
            </tr>
          )}
          {stagers && stagers.length === 0 && (
            <tr className="dark-background">
              <td className="text-warning" colSpan="9">No stagers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
