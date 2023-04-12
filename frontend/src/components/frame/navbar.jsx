import MessageDropdown from "./messages";
import Profile from "./profile";
import { useState } from "react";



export default function NavBar(props) {
  const [user, setUser] = useState(props.User);
  
  return (
    <nav
      className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top "
      id="navigation-example"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-target="#navigation-example"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <MessageDropdown User={user} />
            <Profile User={user} />
          </ul>
        </div>
      </div>
    </nav>
  );
}
