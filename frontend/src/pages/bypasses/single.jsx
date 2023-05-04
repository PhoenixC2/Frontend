import request from "../../logic/api";
import showNotification from "../../logic/notify";
import BypassBrowser from "./browser";
import StagerSelector from "./stagers";
import { useState } from "react";
export default function RunSingleBypass(props) {
	const [bypasses, setBypasses] = useState(props.bypasses);
	const [selectedStager, setSelectedStager] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedBypass, setSelectedBypass] = useState(null);

    async function downloadStager() {
        //TODO: update to work for binary stagers
        const response = await request(`bypasses/run/${selectedCategory}/${selectedBypass.name.toLowerCase()}?stager=${selectedStager.id}`)
        const data = await response.json();

        // download content as file
        if (data.status == "success") {
            const element = document.createElement("a");
            const file = new Blob([data.stager], {type: "text/plain"});
            element.href = URL.createObjectURL(file);
            element.download = `${selectedStager.name}-${selectedBypass.name}-bypass`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();

            // remove element from DOM
            document.body.removeChild(element);
        }
        else {
            showNotification(data.message, data.status);
        }
    }
	return (
		<>
			<StagerSelector setStager={setSelectedStager} />
			<BypassBrowser
				bypasses={bypasses}
				isLoading={props.isLoading}
				isError={props.isError}
				setCategory={setSelectedCategory}
				setBypass={setSelectedBypass}
			/>
			{selectedCategory && selectedBypass && selectedStager && (
				<button className="btn btn-primary" onClick={downloadStager}>
					Run
				</button>
			)}
		</>
	);
}
