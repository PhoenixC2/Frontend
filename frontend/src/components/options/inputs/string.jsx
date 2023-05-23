export default function String(props) {
	return (
		<div className="form-group">
			<label className="text-primary" htmlFor={props.option.real_name}>
				{props.option.name}
			</label>
			<input
				className="form-control"
				type="text"
				name={props.option.real_name}
				defaultValue={
					props.isEdit
						? props.element[props.option.real_name]
						: props.option.default
				}
			/>
			<small className="form-text text-muted">
				{props.option.description}
			</small>
		</div>
	);
}
