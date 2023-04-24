import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import fetchUser, {getPictureUrl} from "../../logic/user";

export default function Profile(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        navigate("/login?error=You are not logged in");
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
              src={getPictureUrl(user.id)}
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
