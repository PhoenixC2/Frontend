import { useState, useEffect } from "react";
import request from "../../logic/api";
import showNotification from "../../logic/notify";

export default function Form(props) {
	const [credential, setCredential] = useState(props.credential ?? {});

	async function handleCreate(event) {
		event.preventDefault();
		const response = await request("credentials/add", "POST", credential);
		const data = await response.json();
		showNotification(data.message, data.status);

		if (data.status === "success") {
			props.setShow(false);
		}
	}

	async function handleEdit(event) {
		event.preventDefault();

		const response = await request(
			`credentials/${props.credential.id}/edit`,
			"PUT",
			credential
		);

		const data = await response.json();
		showNotification(data.message, data.status);

		if (data.status === "success") {
			props.setShow(false);
		}
	}

	useEffect(() => {
		if (props.credential) {
			setCredential(props.credential);
		}
	}, [props.credential]);

	const isEdit = props.credential ? true : false;
    
	return (
		<form onSubmit={props.credential ? handleEdit : handleCreate}>
			<div className="form-group">
				<label htmlFor="name">Username</label>
				<input
					type="text"
					className="form-control"
					id="username"
					placeholder="Enter username"
					defaultValue={isEdit ? props.credential.user : ""}
					onChange={(event) =>
						setCredential({
							...credential,
							user: event.target.value,
						})
					}
				/>
				<small className="form-text text-muted">
					Enter the username for the credential.
				</small>
			</div>
			<div className="form-group">
				<label htmlFor="value">Value</label>
				<input
					type="text"
					className="form-control"
					id="value"
					placeholder="Enter value"
					defaultValue={isEdit ? props.credential.value : ""}
					onChange={(event) =>
						setCredential({
							...credential,
							value: event.target.value,
						})
					}
					required
				/>
				<small className="form-text text-muted">
					The credential itself.
				</small>
			</div>
			<div className="form-check">
				<label className="form-check-label">
					<input
						type="checkbox"
						className="form-check-input"
						defaultChecked={isEdit ? props.credential.hash : false}
						onChange={(event) =>
							setCredential({
								...credential,
								hash: event.target.checked,
							})
						}
					/>
					Hashed
					<span className="form-check-sign">
						<span className="check"></span>
					</span>
				</label>
			</div>

			<div className="form-check">
				<label className="form-check-label">
					<input
						type="checkbox"
						className="form-check-input"
						defaultChecked={isEdit ? props.credential.admin : false}
						onChange={(event) =>
							setCredential({
								...credential,
								admin: event.target.checked,
							})
						}
					/>
					Admin Access
					<span className="form-check-sign">
						<span className="check"></span>
					</span>
				</label>
			</div>
			<input
				type="submit"
				className="btn btn-primary"
				value={isEdit ? "Edit" : "Create"}
			/>
			<input 
				type="reset"
				className="btn btn-danger"
				value="Reset"
				onClick={() => setCredential({})}
			/>

		</form>
	);
}
