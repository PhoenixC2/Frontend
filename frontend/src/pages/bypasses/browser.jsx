import { useEffect, useState } from "react";

export default function BypassBrowser(props) {
	const [bypasses, setBypasses] = useState(props.bypasses);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [search, setSearch] = useState("");

	useEffect(() => {
		setBypasses(props.bypasses);
	}, [props.bypasses]);

	function changeCategory(e) {
		setCurrentCategory(e.target.value);
		props.setCategory(e.target.value);
	}
	const categories = Object.keys(bypasses);

	if (currentCategory === null) {
		setCurrentCategory(categories[0]);
		props.setCategory(categories[0]);
	}

	const filteredBypasses = bypasses[currentCategory]?.filter((bypass) =>
		bypass.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<label htmlFor="search">Search</label>
					<input
						id="search"
						type="text"
						className="form-control"
						placeholder="Bypass"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="col">
					<label htmlFor="category">Category</label>
					<select
						id="category"
						className="form-control"
						onChange={changeCategory}
					>
						{categories &&
							categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col">
					{props.isLoading && (
						<p className="text-warning">Loading...</p>
					)}
					{props.isError && (
						<p className="text-danger">Error fetching bypasses</p>
					)}
					{filteredBypasses &&
						filteredBypasses.map((bypass) => (
							<div
								className="card dark-background"
								key={currentCategory + "-" + bypass.name}
							>
								<div className="card-body" key={bypass.id}>
									<h5 className="card-title text-primary">
										{bypass.name}
									</h5>
									<p className="card-text">
										{bypass.description}
									</p>
									<div className="float-right">
										<button
											className="btn btn-primary"
											onClick={() =>
												props.setBypass(bypass)
											}
										>
											Use
										</button>
									</div>
									{/* show author on bottom of card */}
									<p className="card-text">
										Created by: {bypass.author}
									</p>
								</div>
							</div>
						))}
					{!bypasses && <p>No bypasses found</p>}
					{filteredBypasses && !filteredBypasses.length && (
						<div className="card dark-background">
							<p className="text-danger">No bypasses found</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
