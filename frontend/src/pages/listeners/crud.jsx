import { useState, useEffect } from "react";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import Modal from "../../components/modal";
import OptionCollection from "../../components/options";
import Info from "../../components/info";

function Form(props) {
	const [listener, setListener] = useState(props.listener);
	const [type, setType] = useState(props.type);

	useEffect(() => {
		setListener(props.listener);
		setType(props.type);
	}, [props]);

	const isEdit = listener !== undefined;

	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<Info type={type} />
				{listener === undefined && (
					<input type="hidden" name="type" value={type.name} />
				)}
				<OptionCollection options={type.options} element={listener} />
				<button type="submit" className="btn btn-primary">
					{isEdit ? "Edit" : "Create"}
				</button>
				<button type="reset" className="btn btn-danger">
					Reset
				</button>
			</form>
		</>
	);
}

function CreateBody(props) {
	const [types] = useState(props.types);
	const [type, setType] = useState(Object.values(types)[0]);

	function handleChange(event) {
		setType(types[event.target.value]);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		const response = await request(
			"listeners/add",
			"POST",
			Object.fromEntries(data.entries())
		);
		const responseData = await response.json();
		showNotification(responseData.message, responseData.status);
		props.setShow(false);
		await getListeners();
	}

	return (
		<>
			{Object.keys(types).length > 0 && (
				<div className="container">
					<form>
						<div className="form-group">
							<label className="text-primary">
								Listener Type
							</label>
							<select
								className="form-control"
								onChange={handleChange}
								required
							>
								{Object.keys(types).map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
							<small className="form-text text-muted">
								Select the type of listener you want to create.
							</small>
						</div>
					</form>
				</div>
			)}
			{type !== undefined && (
				<Form type={type} handleSubmit={handleSubmit} />
			)}
		</>
	);
}

export function CreateModal(props) {
	return (
		<>
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => props.setShow(true)}
			>
				Create a new listener
			</button>
			<Modal
				id="create-modal"
				title="Create a new listener"
				body={
					<CreateBody
						types={props.listenerTypes}
						setShow={props.setShow}
					/>
				}
				show={props.show}
				setShow={props.setShow}
			/>
		</>
	);
}

export function EditModal(props) {
	const [listener, setListener] = useState(props.listener);

	useEffect(() => {
		setListener(props.listener);
	}, [props.listener]);

	const type = Object.values(props.listenerTypes).find(
		(type) => type.name === listener.type
	);
	
	return (
		<Modal
			id={`edit-modal-${listener.id}`}
			title="Edit listener"
			body={
				<Form
					type={type}
					handleSubmit={props.handleSubmit}
					listener={listener}
				/>
			}
			show={props.show}
			setShow={props.setShow}
		/>
	);
}
