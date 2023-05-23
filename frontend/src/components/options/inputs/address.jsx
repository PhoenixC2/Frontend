export default function Address(props) {
	return (
		<div className="form-group">
			<label className="text-primary" htmlFor={props.option.real_name}>
				{props.option.name}
			</label>
			<input
				list="addresses"
				className="form-control"
				type="text"
				name={props.option.real_name}
				defaultValue={
					props.isEdit
						? props.element[props.option.real_name]
						: props.option.default
				}
			/>
			<datalist id="addresses">
				{Object.keys(props.option.type_data.interfaces).map(
					(net_interface) => (
						<option value={net_interface} key={net_interface}>
							{net_interface}:{" "}
							{props.option.type_data.interfaces[net_interface]}
						</option>
					)
				)}
			</datalist>
			<small className="form-text text-muted">
				{props.option.description}
			</small>
		</div>
	);
}
