import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import fetchUser, { getPictureUrl } from "../../logic/user";
import { useQuery } from "@tanstack/react-query";

export default function Profile(props) {
  const navigate = useNavigate();

  async function fetchData() {
    try {
      return await fetchUser();
    } catch (error) {
      navigate("/login?error=You are not logged in");
    }
  }

  const { data: user } = useQuery(["user"], fetchData, {
    refetchInterval: 10000,
  });

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link"
        id="navbarDropdownProfile"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {user && (
          <>
            {user.id && (
              <img
                className="profile-picture"
                src={getPictureUrl(user.id)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/icon.png";
                }}
              />
            )}
            <p className="d-lg-none d-md-block">{user.username}</p>
          </>
        )}
        {!user && (
          <>
            <img className="profile-picture" src="/icon.png" />
            <p className="d-lg-none d-md-block">Account</p>
          </>
        )}
      </a>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="navbarDropdownProfile"
      >
        {user && (
          <>
          <a className="dropdown-item text-warning">
            {user.username}
          </a>
          <div className="dropdown-divider"></div>
          </>
        )}

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
  );
}
