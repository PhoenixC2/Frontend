import CustomButton from './custom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DeleteButton(props) {
    return (
        <CustomButton
            color="danger"
            icon={faTrash}
            title={props.title ? props.title : "Delete"}
            onClick={props.onClick}
        />
    );
}