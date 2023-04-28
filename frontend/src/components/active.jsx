import { useState, useEffect } from "react";
export default function Active(props) {
	const [active, setActive] = useState(props.active);
	useEffect(() => {
		setActive(props.active);
	}, [props.active]);

	return (
		<i
			title={
				active
					? props.activeTitle ?? "Active"
					: props.inactiveTitle ?? "Inactive"
			}
			className="material-icons"
			// set color to green if listener is active and red if not
			style={{
				color: active ? "green" : "red",
				marginTop: "4px",
				marginLeft: "4px",
			}}
		>
			circle
		</i>
	);
}
