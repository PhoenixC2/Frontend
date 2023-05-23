import CustomButton from "./custom";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function EditButton(props) {
	return (
		<CustomButton
			color="warning"
			icon={faEdit}
			title={props.title ? props.title : "Edit"}
			onClick={props.onClick}
		/>
	);
}
