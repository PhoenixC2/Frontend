import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import fetchUser from "../../logic/auth";

export default function Profile(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {user && (
        <li className="nav-item dropdown">
          <a
            className="nav-link"
            id="navbarDropdownProfile"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="profile-picture"
              src={
                "http://localhost:8080/api/users/" +
                user.id +
                "/picture?api_key=" +
                Cookies.get("api_key")
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/icon.png";
              }}
            />
            <p className="d-lg-none d-md-block">{user.username}</p>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdownProfile"
          >
            <a
              className="dropdown-item text-danger"
              onClick={() => {
                Cookies.remove("api_key");
                navigate("/login");
              }}
            >
              Log out
            </a>
          </div>
        </li>
      )}
    </>
  );
}
