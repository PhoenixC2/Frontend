import { useQuery } from "@tanstack/react-query";
import { getData } from "../../logic/api";
import Chain from "./chain";

export default function Bypasses(props) {
  const {
    data: chains,
    isLoading,
    isError,
  } = useQuery(
    ["chains"],
    async () => {
      const data = await getData("bypasses/chains?creator=true");
      return data.chains;
    },
    {
      refetchInterval: 10000,
    }
  );

  const {
		data: bypasses,
		bypassesIsLoading,
		bypassesIsError,
	} = useQuery(["bypasses"], async () => {
		const data = await getData("bypasses/?full=true");
		return data.bypasses;
	});


  return (
    <>
    <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th className="text-center">ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Bypasses</th>
          </tr>
        </thead>
        <tbody>
          {chains &&
            chains.length > 0 &&
            chains.map((operation) => (
              <Chain key={operation.id} chain={operation} />
            ))}
          {isLoading && (
            <tr className="dark-background">
              <td className="text-warning" colSpan="9">Loading...</td>
            </tr>
          )}
          {isError && (
            <tr className="dark-background">
              <td className="text-danger" colSpan="9">Error fetching chains</td>
            </tr>
          )}
          {chains && chains.length === 0 && (
            <tr className="dark-background">
              <td className="text-warning" colSpan="9">No bypasses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}