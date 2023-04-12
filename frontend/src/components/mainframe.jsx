import SideBar from "./frame/sidebar";
import NavBar from "./frame/navbar";
import fetchUser from "../logic/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainFrame(props) {
  const body = props.body ? props.body : <div>Empty</div>;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetch() {
      try {
        const userData = await fetchUser();
        console.log(userData);
        setUser(userData);
      } catch (error) {
        navigate("/login");
      }
    }
    if (!user) {
      fetch();
    }
  });

  return (
    <>
      {user && (
        <div className="wrapper">
          <SideBar />
          <div className="main-panel">
            <NavBar User={user} />
            <div className="content">
              <div className="container-fluid">{body}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
