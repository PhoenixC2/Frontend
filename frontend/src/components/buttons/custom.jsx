import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CustomButton(props) {
	return (
		<button
			className={"btn btn-" + props.color}
			onClick={props.onClick}
			data-toggle="tooltip"
			data-placement="top"
			title={props.title}
		>
			<FontAwesomeIcon icon={props.icon} />
		</button>
	);
}
