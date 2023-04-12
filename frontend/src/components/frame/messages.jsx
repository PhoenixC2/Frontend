import { Link} from "react-router-dom"
import { useState } from "react"

function Message(props) {
    log = props.log
    return (
        <Link className="dropdown-item {log.status}" to="/logs/{log.id}">
            {log.user ? log.user : "System"} {log.description}
        </Link>
    )
}
export default function MessageDropdown(props){
    const [user, setUser] = useState(props.User);

    return (
        <li className="nav-item dropdown">
        <a className="nav-link"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
                <i className="material-icons">notifications</i>
                <span className="notification">{user.unseen_logs.length}</span>
                <p className="d-lg-none d-md-block">Notifications</p>
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            {user.unseen_logs.length == 0 && <p className="dropdown-item">No new notifications</p>}
            {user.unseen_logs.map((log) => <Message log={log} />)}
        </div>
        </li>
    )
}

