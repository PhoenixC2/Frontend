import request from "../../logic/api";
import showNotification from "../../logic/notify";
import BypassBrowser from "./browser";
import StagerSelector from "./stagers";
import { useState } from "react";

export default function RunSingleBypass(props) {
	const [bypasses] = useState(props.bypasses);
	const [selectedStager, setSelectedStager] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedBypass, setSelectedBypass] = useState(null);

    async function downloadStager() {
        const response = await request(`bypasses/run/${selectedCategory}/${selectedBypass.name.toLowerCase()}?stager=${selectedStager.id}`)
		
        if (response.ok) {
			const blob = await response.blob()
            const element = document.createElement("a");
            element.href = URL.createObjectURL(blob);
            element.download = `${selectedStager.name}-${selectedBypass.name}-bypass`;
            document.body.appendChild(element);
            element.click();

            // remove element from DOM
            document.body.removeChild(element);
        }
        else {
			const data = await response.json();
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
