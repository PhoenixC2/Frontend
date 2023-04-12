import { Component } from "react";
import logout from "../logic/auth.js";

class LogoutButton extends Component {
    render() {
        return (
            <button type="button" onClick={() => logout()}>Logout</button>
        );
    }
}

export default LogoutButton;