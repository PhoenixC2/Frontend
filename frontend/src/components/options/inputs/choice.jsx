export default function Choice(props) {
	return (
		<div className="form-group">
			<label className="text-primary" htmlFor={props.option.real_name}>
				{props.option.name}
			</label>
			<select
				className="form-control"
				name={props.option.real_name}
				defaultValue={
					props.isEdit
						? props.element[props.option.real_name]
						: props.option.default
				}
			>
				{props.option.type_data.choices.map((choice) => (
					<option value={choice} key={choice}>
						{choice}
					</option>
				))}
			</select>
			<small className="form-text text-muted">
				{props.option.description}
			</small>
		</div>
	);
}
