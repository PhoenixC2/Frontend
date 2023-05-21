import { useEffect, useState } from "react";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import OptionCollection from "../../components/options/options";
import Info from "../../components/info";
import Modal from "../../components/modal";

function AdditionalPayloadInfo(props) {
	const [payload, setPayload] = useState(props.payload);

	useEffect(() => {
		setPayload(props.payload);
	}, [props]);

	return (
		<>
			<p className="card-text">
				Language: {payload.language}
				<br />
				Compiled: {payload.compiled ? "✅" : "❌"}
			</p>
		</>
	);
}

function Form(props) {
	const [stager, setStager] = useState(props.stager);
	const [type, setType] = useState(props.type);
	const [listener, setListener] = useState(props.listener);
	const isEdit = stager !== undefined;
	const [payload, setPayload] = useState(
		isEdit ? stager.payload : Object.keys(type.payloads)[0]
	);

	useEffect(() => {
		setStager(props.stager);
		setType(props.type);
		setListener(props.listener);
	}, [props]);

	return (
		<>
			<form onSubmit={props.handleSubmit}>
				{stager === undefined && (
					<input type="hidden" name="listener" value={listener.id} />
				)}
				<OptionCollection options={type.options} element={stager} />
				<div className="form-group">
					<label className="text-primary">Payload</label>
					<select
						className="form-control"
						name="payload"
						onChange={(e) => setPayload(e.target.value)}
						disabled={isEdit}
						defaultValue={payload}
					>
						{Object.keys(type.payloads).map((payload) => (
							<option key={payload} value={payload}>
								{payload}
							</option>
						))}
					</select>
					<small className="form-text text-muted">
						The payload the stager will use.
					</small>
				</div>
				{payload && (
					<>
						<Info
							type={type.payloads[payload]}
							additionalInfo={
								<AdditionalPayloadInfo
									payload={type.payloads[payload]}
								/>
							}
						/>
						{type.payloads[payload].options.length > 0 && (
							<OptionCollection
								options={type.payloads[payload].options}
								element={stager ? stager.options : undefined}
							/>
						)}
					</>
				)}
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
	const [listeners, setListeners] = useState(props.listeners);
	const [listener, setListener] = useState(
		Object.values(listeners)[0] || null
	);
	const [type, setType] = useState(props.types[listener.type]);

	function handleChange(event) {
		setListener(listeners[event.target.value - 1]);
		setType(props.types[listeners[event.target.value - 1].type]);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);

		const response = await request(
			"stagers/add",
			"POST",
			Object.fromEntries(data.entries())
		);
		const responseData = await response.json();
		showNotification(responseData.message, responseData.status);
		props.setShow(false);
	}

	useEffect(() => {
		setListeners(props.listeners);
	}, [props.listeners]);

	return (
		<>
			{listeners.length > 0 && (
				<div className="form-group">
					<label className="text-primary">Listener</label>
					<select className="form-control" onChange={handleChange}>
						{listeners.map((listener) => (
							<option key={listener.id} value={listener.id}>
								{listener.name} : {listener.type}
							</option>
						))}
					</select>
					<small className="form-text text-muted">
						The listener the stager will use.
					</small>
				</div>
			)}
			{type && (
				<Form
					type={type}
					listener={listener}
					handleSubmit={handleSubmit}
				/>
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
				Create a new stager
			</button>
			<Modal
				id="create-modal"
				title="Create a new stager"
				body={
					<CreateBody
						listeners={props.listeners}
						types={props.stagerTypes}
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
	const [stager, setStager] = useState(props.stager);

	useEffect(() => {
		setStager(props.stager);
	}, [props]);

	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		const response = await request(
			`stagers/${stager.id}/edit`,
			"PUT",
			Object.fromEntries(data.entries())
		);
		const responseData = await response.json();
		showNotification(responseData.message, responseData.status);
		props.setShow(false);
	}

	return (
		<Modal
			id="edit-modal"
			title="Edit stager"
			body={
				<Form
					stager={stager}
					type={props.stagerTypes[stager.listener.type]}
					listener={stager.listener}
					handleSubmit={handleSubmit}
				/>
			}
			show={props.show}
			setShow={props.setShow}
		/>
	);
}
