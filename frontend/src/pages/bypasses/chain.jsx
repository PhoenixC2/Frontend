import { useEffect, useState } from "react";

export default function Chain(props) {
	const [chain, setChain] = useState(props.chain);

	useEffect(() => {
		setChain(props.chain);
	}, [props.chain]);

	return (
		<tr className="dark-background">
			<td className="text-center">{chain.id}</td>
			<td>{chain.name}</td>
			<td>
				{chain.description.substring(0, 30) +
					(chain.description.length > 30 ? "..." : "")}
			</td>
			<td>
				{chain.bypasses.map((bypass) => (
					<span key={bypass.id}>{bypass.name} </span>
				))}
			</td>
		</tr>
	);
}
