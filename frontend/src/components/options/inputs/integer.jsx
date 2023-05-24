export default function Integer(props) {
	return (
		<div className="form-group">
			<label className="text-primary" htmlFor={props.option.real_name}>
				{props.option.name}
			</label>
			<input
				className="form-control"
				type="number"
				name={props.option.real_name}
				defaultValue={
					props.isEdit
						? props.element[props.option.real_name]
						: props.option.default
				}
				required={props.option.required}
			/>
			<small className="form-text text-muted">
				{props.option.description}
			</small>
		</div>
	);
}
