import { useState, useEffect } from "react";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import { getPictureUrl } from "../../logic/user";

export default function Form(props) {
	const [user, setUser] = useState(props.user ?? {});
	const [profilePicture, setProfilePicture] = useState("/icon.png");
	const [pictureData, setPictureData] = useState(null);

	async function handleCreate(event) {
		event.preventDefault();
		const response = await request("/users/add", "POST", user);
		const data = await response.json();
		showNotification(data.message, data.status);

		const responsePicture = await fetch(
			`/api/users/${data.user.id}/picture`,
			{
				method: "POST",
				body: pictureData,
			}
		);
		const dataPicture = await responsePicture.json();
		showNotification(dataPicture.message, dataPicture.status);

		if (data.status === "success") {
			props.setShow(false);
		}
	}
	async function handleEdit(event) {
		event.preventDefault();
		// delete everything from user object except username, password, admin, disabled
		for (const key in user) {
			if (
				key !== "username" &&
				key !== "password" &&
				key !== "admin" &&
				key !== "disabled"
			) {
				delete user[key];
			}
		}

		// delete password if empty so it doesn't get updated
		if (user.password === "") delete user.password;
		const response = await request(
			`/users/${props.user.id}/edit`,
			"PUT",
			user
		);
		const data = await response.json();
		showNotification(data.message, data.status);

		if (data.status === "success") {
			props.setShow(false);
		}
	}

	function changeProfilePicturePreview(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setProfilePicture(reader.result);
			setPictureData(file);
		};
		reader.readAsDataURL(file);
	}

	useEffect(() => {
		if (props.user) setUser(props.user);
	}, [props.user]);

	if (props.user && props.user.profile_picture) {
		useEffect(() => {
			setProfilePicture(getPictureUrl(props.user.id));
		}, [props.user.profile_picture]);
	}

	return (
		<form onSubmit={props.user ? handleEdit : handleCreate}>
			{/* profile picture preview */}
			<div className="form-group">
				<div className="row">
					<div className="col-md-5"></div>
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-12">
								<input
									type="file"
									id="profilePicture"
									className="form-control  border rounded p-3"
									onChange={changeProfilePicturePreview}
								/>
								<img
									id="picture-preview"
									src={profilePicture}
									className="profile-picture"
									// onError={(e) => {
									// 	e.target.onerror = null;
									// 	e.target.src = "/icon.png";
									// }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="form-group">
				<label htmlFor="username">Username</label>
				<input
					type="text"
					className="form-control"
					id="username"
					defaultValue={props.user ? props.user.username : user.username}
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
					defaultValue={props.user ? props.user.password : user.password}
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
						defaultChecked={props.user ? props.user.admin : false}
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
						defaultChecked={
							props.user ? props.user.disabled : false
						}
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
			<input type="submit" className="btn btn-primary" value={props.user ? "Edit" : "Create"} />
			<input type="reset" className="btn btn-danger" value="Reset" />
		</form>
	);
}
