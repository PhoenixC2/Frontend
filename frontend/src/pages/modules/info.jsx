import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLinux,
	faWindows,
	faApple,
} from "@fortawesome/free-brands-svg-icons";
export default function ModuleInfo(props) {
	const module = props.module;

	return (
		<div>
			<p>{module.description}</p>
			<p>Admin required: {module.enabled ? "✅" : "❌"}</p>
			<p>Language: {module.language}</p>
			<p>
				Supported OS:{" "}
				{module.os.map((os) => {
					switch (os) {
						case "linux":
							return (
								<>
									<FontAwesomeIcon title="Linux" icon={faLinux} />{" "}
								</>
							);
						case "windows":
							return (
								<>
									<FontAwesomeIcon title="Windows" icon={faWindows} />{" "}
								</>
							);
						case "osx":
							return (
								<>
									<FontAwesomeIcon title="OSX" icon={faApple} />{" "}
								</>
							);
						default:
							return os;
					}
				})}
			</p>
			<p>Author: {module.author}</p>
		</div>
	);
}