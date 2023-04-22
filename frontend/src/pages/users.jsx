import { useEffect, useState } from "react";
import request from "../logic/api";
import Cookies from "js-cookie";

export default function Users(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await request("users");
      const usersData = await response.json();
      setUsers(usersData.users);
    }
    getUsers();
    const interval = setInterval(getUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Profile Picture</th>
            <th>Username</th>
            <th>Admin</th>
            <th>Disabled</th>
            <th>Last Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr className="dark-background" key={user.id}>
                <td>{user.id}</td>
                <td>
                  <i
                    title="Active"
                    className="material-icons"
                    // set color to green if user is active, orange if inactive and red if offline
                    style={{
                      color: user.status ? "green" : user.status ? "orange" : "red",
                      marginTop: "4px",
                      marginLeft: "4px",
                    }}
                  >
                    circle
                  </i>
                </td>
                <td>
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
                </td>
                <td>{user.username}</td>
                <td>{user.admin ? "✅" : "❌"}</td>
                <td>{user.disabled ? "✅" : "❌"}</td>
                <td>{user.last_activity}</td>
                <td>
                  <button type="button" className="btn btn-warning">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {users.length === 0 && (
            <tr className="dark-background">
              <td colSpan="9">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
