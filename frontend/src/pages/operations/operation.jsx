import UserRender from "../../components/user";
import { getPictureUrl } from "../../logic/operations";
import EditButton from "../../components/buttons/edit";
import DeleteButton from "../../components/buttons/delete";
export default function Operation(props) {
	return (
		<tr key={props.operation.id}>
			<td className="text-center">{props.operation.id}</td>
			<td>
				<img
					className="profile-picture"
					src={getPictureUrl(props.operation.id)}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = "/icon.png";
					}}
				/>
			</td>
			<td>{props.operation.name}</td>
			<td>
				{props.operation.description.substring(0, 30) +
					(props.operation.description.length > 30 ? "..." : "")}
			</td>
			<td>
				<UserRender user={props.operation.owner} />
			</td>
			<td>
				{props.operation.users.map((user) => (
					<span key={user.id}>
						<UserRender user={user} />
					</span>
				))}
			</td>
			<td>{props.operation.expiry}</td>
			<td>
                <EditButton />
                <DeleteButton />
			</td>
		</tr>
	);
}
