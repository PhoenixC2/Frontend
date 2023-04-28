import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../logic/api";
import { getPictureUrl } from "../../logic/user";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import Form from "./form";
import Modal from "../../components/modal";

export default function Users(props) {
  const [currentUserEdit, setCurrentUserEdit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEdtiModal, setShowEditModal] = useState(false);

  function showEditModal(user){
    setCurrentUserEdit(user);
    setShowEditModal(true);
  }
  async function deleteUser(user_id) {
    const response = await request(`/users/${user_id}/remove`, "DELETE");
    const data = await response.json();
    showNotification(data.message, data.status);
  }
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(
    ["users"],
    async () => {
      const data = await getData("users/");
      return data.users;
    },
    { refetchInterval: 10000 }
  );

  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">ID</th>
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
                  <td className="text-center">{user.id}</td>
                  <td>
                    <i
                      title={ user.status }
                      className="material-icons"
                      // set color to green if user is active, orange if inactive and red if offline
                      style={{
                        color: user.status
                          ? "green"
                          : user.status
                          ? "orange"
                          : "red",
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
                      src={getPictureUrl(user.id)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/icon.png";
                      }}
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.admin ? "✅" : "❌"}</td>
                  <td>{user.disabled ? "✅" : "❌"}</td>
                  <td>{user.last_activity ?? "Never"}</td>
                  <td>
                    <button type="button" className="btn btn-warning" onClick={() => showEditModal(user)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {isLoading && (
              <tr className="dark-background">
                <td className="text-warning" colSpan="8">
                  Loading...
                </td>
              </tr>
            )}
            {isError && (
              <tr className="dark-background">
                <td className="text-danger" colSpan="8">
                  Error fetching users
                </td>
              </tr>
            )}
            {users && users.length === 0 && (
              <tr className="dark-background">
                <td className="text-warning" colSpan="8">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
        Add User
      </button>
      <Modal show={showCreateModal} setShow={setShowCreateModal} title="Add User" body={<Form setShow={setShowCreateModal} />} />
      {currentUserEdit && (
        <Modal
          show={currentUserEdit !== null}
          setShow={setCurrentUserEdit}
          title="Edit User"
          body={<Form setShow={setCurrentUserEdit} user={currentUserEdit} />}
        />
      )}
    </>
  );
}
