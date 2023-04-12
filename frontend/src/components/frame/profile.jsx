import { useState } from "react"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Profile(props) {
    const [user, setUser] = useState(props.User);

    return <>
        {user && (
            <li className="nav-item dropdown">
            <a className="nav-link"
            id="navbarDropdownProfile"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
                <img className="profile-picture"
                    src={"http://localhost:8080/api/users/" + user.id + "/picture?api_key=" + Cookies.get("api_key")}
                    onError={(e) => { e.target.onerror = null; e.target.src = "/icon.png" }} />
                <p className="d-lg-none d-md-block">{user.username}</p>
            </a>
            <div className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownProfile">
                <Link className="dropdown-item text-danger" to="/logout">Log out</Link>
            </div>
            </li>
        )}
    </>
}