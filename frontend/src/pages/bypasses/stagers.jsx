import { useQuery } from "@tanstack/react-query";

import { getData } from "../../logic/api";
import { useEffect } from "react";

export default function StagerSelector(props) {
	const {
		data: stagers,
		isLoading,
		isError,
	} = useQuery(["stagers"], async () => {
		const data = await getData("stagers/?listener=true");
		return data.stagers;
	});

	useEffect(() => {
		if (stagers && stagers.length > 0) props.setStager(stagers[0]);
	}, [stagers]);

	function handleChange(e) {
		const stager = stagers.find((stager) => stager.id == e.target.value);
		props.setStager(stager);
	}

	return (
		<div className="form-group">
			{stagers && (
				<>
					<label htmlFor="stager">Select a stager</label>
					<select
						className="form-control"
						id="stager"
						name="stager"
						onChange={handleChange}
					>
						{stagers &&
							stagers.map((stager) => (
								<option key={stager.id} value={stager.id}>
									{stager.name}
								</option>
							))}
					</select>
					<small className="form-text text-muted">
						The stager to execute the bypass with.
					</small>
				</>
			)}
			{isLoading && <p className="text-primary">Loading...</p>}
			{isError && <p className="text-danger">Error fetching stagers</p>}
		</div>
	);
}
