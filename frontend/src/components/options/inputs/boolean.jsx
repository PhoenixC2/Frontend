export default function Boolean(props) {
	return (
		<div className="form-check">
			<label className="form-check-label text-primary">
				<input
					type="hidden"
					name={props.option.real_name}
					value="off"
				/>
				<input
					className="form-check-input"
					type="checkbox"
					name={props.option.real_name}
					defaultChecked={
						props.isEdit
							? props.element.option.real_name
							: props.option.default
					}
				/>
				{props.option.name}
				<span className="form-check-sign">
					<span className="check"></span>
				</span>
			</label>
			<small className="form-text text-muted">
				{props.option.description}
			</small>
		</div>
	);
}
