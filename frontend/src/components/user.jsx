import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPictureUrl } from "../logic/user";

export default function UserRender(props) {
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  // link with username and profile picture
  // when hovered show card with more info
  return (
    <>
      {user && (
        <Link to={"/users/?user=" + user.id}>
          <img
            className="profile-picture"
            src={getPictureUrl(user.id)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/icon.png";
            }}
            data-toggle="tooltip"
            data-placement="top"
            title={user.username}
            alt={user.username}
          />
        </Link>
      )}
    </>
  );
}
