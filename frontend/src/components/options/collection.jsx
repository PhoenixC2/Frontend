import {Fragment, useEffect, useState } from "react";
import Boolean from "./inputs/boolean";
import Address from "./inputs/address";
import Port from "./inputs/port";
import Choice from "./inputs/choice";
import Table from "./inputs/table";
import String from "./inputs/string";
import Integer from "./inputs/integer";

export default function OptionCollection(props) {
	const [options, setOptions] = useState(props.options);
	const [element, setElement] = useState(props.element); // Element is the element to edit

	useEffect(() => {
		setOptions(props.options);
		setElement(props.element);
	}, [props]);

	const isEdit = element !== undefined;

	let modifiedOptions = options.filter((option) => option.render);

	if (isEdit) {
		modifiedOptions = options.filter((option) => option.editable);
	}
	console.log(element);
	return (
		<>
			{modifiedOptions &&
				modifiedOptions.map((option) => (
					<Fragment key={option.real_name}>
						{option.type === "boolean" && (
							<Boolean
								option={option}
								isEdit={isEdit}
								element={element}
							/>
						)}
						{option.type === "address" && (
							<Address
								option={option}
								isEdit={isEdit}
								element={element}
							/>
						)}
						{option.type === "port" && (
							<Port
								option={option}
								isEdit={isEdit}
								element={element}
							/>
						)}
						{option.type === "choice" && (
							<Choice
								option={option}
								isEdit={isEdit}
								element={element}
							/>
						)}
						{option.type === "table" && (
							<Table
								option={option}
								isEdit={isEdit}
								element={element}
							/>
						)}
						{option.type === "string" && (
							<String
								option={option}
								isEdit={isEdit}
								element={element}
							/>
						)}
						{option.type === "integer" && (
							<Integer
								option={option}
								isEdit={isEdit}
								element={element}
							/>
						)}
					</Fragment>
				))}
		</>
	);
}
