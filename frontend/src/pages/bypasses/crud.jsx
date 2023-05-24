import { useState, useEffect } from "react";
import request from "../../logic/api";
import showNotification from "../../logic/notify";

export default function Form(props) {
	const [chain, setChain] = useState(props.chain ?? {});
	const [currentBypassCategory, setCurrentBypassCategory] = useState(null);

	async function handleCreate(event) {
		event.preventDefault();
		const response = await request("bypasses/chains/add", "POST", chain);
		const data = await response.json();
		showNotification(data.message, data.status);

		if (data.status === "success") {
			props.setShow(false);
		}
	}

	async function handleEdit(event) {
		event.preventDefault();

		const response = await request(
			`bypasses/chains/${props.chain.id}/edit`,
			"PUT",
			chain
		);

		const data = await response.json();
		showNotification(data.message, data.status);

		if (data.status === "success") {
			props.setShow(false);
		}
	}

	async function addBypass(chain){
		const response = await request(
			`bypasses/chains/${props.chain.id}/bypasses/add`,
			"POST",
			{
				category: currentBypassCategory,
				name: chain.name,
			}
		);

		const data = await response.json();
		showNotification(data.message, data.status);

		if (data.status === "success") {
			props.setShow(false);
		}
	}

	useEffect(() => {
		if (props.chain) {
			setChain(props.chain);
		}
	}, [props.chain]);

	const isEdit = props.chain ? true : false;
	return (
		<form onSubmit={props.chain ? handleEdit : handleCreate}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    defaultValue={isEdit ? chain.name : ""}
                    onChange={(event) => {
                        setChain({ ...chain, name: event.target.value });
                    }}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Description</label>
                <textarea
                    className="form-control"
                    placeholder="Description"
                    defaultValue={isEdit ? chain.description : ""}
                    onChange={(event) => {
                        setChain({ ...chain, description: event.target.value });
                    }}
                />
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
                onClick={() => {
                    setChain(props.chain ?? {});
                }}
            />
		</form>
	);
}
