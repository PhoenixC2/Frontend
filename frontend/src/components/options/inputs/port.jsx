export default function Port(props) {
	return (
		<div className="form-group">
			<label className="text-primary" htmlFor={props.option.real_name}>
				{props.option.name}
			</label>
			<input
				className="form-control md-label-static"
				type="number"
				name={props.option.real_name}
				defaultValue={
					props.isEdit
						? props.element[props.option.real_name]
						: props.option.default
				}
				min={1}
				max={65535}
				required={props.option.required}
			/>
			<small className="form-text text-muted">
				{props.option.description}
			</small>
		</div>
	);
}
