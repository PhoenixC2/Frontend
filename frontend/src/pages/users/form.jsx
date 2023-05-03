import { useState, useEffect } from "react";
import request, { uploadFile } from "../../logic/api";
import showNotification from "../../logic/notify";
import { getPictureUrl } from "../../logic/user";

export default function Form(props) {
	const [user, setUser] = useState(props.user ?? {});
	const [profilePicture, setProfilePicture] = useState("/icon.png");
	const [pictureData, setPictureData] = useState(null);
	const [deletePicture, setDeletePicture] = useState(false);

	async function handleCreate(event) {
		event.preventDefault();
		const response = await request("users/add", "POST", user);
		const data = await response.json();
		showNotification(data.message, data.status);

		if (data.status === "success" && pictureData) {
			const responsePicture = await uploadFile(
				`users/${data.user.id}/picture`,
				pictureData
			);
			const dataPicture = await responsePicture.json();
			showNotification(dataPicture.message, dataPicture.status);
		}

		if (data.status === "success") {
			props.setShow(false);
		}
	}

	async function handleEdit(event) {
		event.preventDefault();

		// delete password if empty so it doesn't get updated
		if (user.password === "") delete user.password;

		const response = await request(
			`users/${props.user.id}/edit`,
			"PUT",
			user
		);

		const data = await response.json();
		showNotification(data.message, data.status);

		if (data.status === "success") {
			props.setShow(false);
		}
		if (deletePicture) {
			const responsePicture = await request(
				`users/${props.user.id}/picture`,
				"DELETE"
			);
			const dataPicture = await responsePicture.json();
			showNotification(dataPicture.message, dataPicture.status);
		}
		else if (pictureData) {
			const responsePicture = await uploadFile(
				`users/${props.user.id}/picture`,
				pictureData
			);
			const dataPicture = await responsePicture.json();
			showNotification(dataPicture.message, dataPicture.status);
		}
	}

	function changePictureData(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setProfilePicture(reader.result);
			setPictureData(file);
		};
		reader.readAsDataURL(file);
	}

	useEffect(() => {
		if (props.user) {
			setUser(props.user);
			setProfilePicture(getPictureUrl(props.user.id));
		}
	}, [props.user]);

	const isEdit = props.user ? true : false;
	return (
		<form onSubmit={props.user ? handleEdit : handleCreate}>
			{/* profile picture preview */}
			<div className="form-group">
				<div className="row">
					<div className="col-md-5"></div>
					<div className="col-md-6">
						<input
							type="file"
							id="profilePicture"
							className="form-control  border rounded p-3"
							onChange={changePictureData}
							placeholder="Profile Picture"
						/>
						<img
							id="picture-preview"
							src={profilePicture}
							className="profile-picture"
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = "/icon.png";
								setPictureData(null);
							}}
							onClick={() => {
								document
									.getElementById("profilePicture")
									.click();
							}}
						/>
					</div>
				</div>
			</div>

			<div className="form-group">
				<label htmlFor="username">Username</label>
				<input
					type="text"
					className="form-control"
					id="username"
					defaultValue={isEdit ? user.username : ""}
					onChange={(event) => {
						setUser({ ...user, username: event.target.value });
					}}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					className="form-control"
					id="password"
					onChange={(event) =>
						setUser({ ...user, password: event.target.value })
					}
				/>
			</div>
			<div className="form-check">
				<label className="form-check-label">
					<input
						type="checkbox"
						className="form-check-input"
						defaultChecked={isEdit ? user.admin : false}
						onChange={(event) =>
							setUser({ ...user, admin: event.target.checked })
						}
					/>
					Admin
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
						defaultChecked={isEdit ? user.disabled : false}
						onChange={(event) =>
							setUser({ ...user, disabled: event.target.checked })
						}
					/>
					Disabled
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
			{isEdit && (
				<button
					type="button"
					className="btn btn-danger"
					value="Delete"
					onClick={() => {
						setDeletePicture(true);
						setProfilePicture("/icon.png");
					}}
				>
					Delete Picture
				</button>
			)}
		</form>
	);
}
