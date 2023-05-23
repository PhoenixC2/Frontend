import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
export default function Active(props) {
	const [active, setActive] = useState(props.active);
	useEffect(() => {
		setActive(props.active);
	}, [props.active]);

	return (
		<FontAwesomeIcon
			title={
				active
					? props.activeTitle ?? "Active"
					: props.inactiveTitle ?? "Inactive"
			}
			style={{
				marginTop: "4px",
				marginLeft: "4px",
			}}
			color={active ? "green" : "red"}
			icon={faCircle}
			size="lg"
		/>
	);
}
