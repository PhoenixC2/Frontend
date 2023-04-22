import { useEffect, useState } from "react";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import TypeSwitcher from "./switcher";

export default function Listeners(props) {
  const [listeners, setListeners] = useState([]);
  const [listenerTypes, setListenerTypes] = useState([]);

  async function startListener(id) {
    showNotification("Starting listener.", "info");
    const listener = listeners.find((listener) => listener.id === id);
    listener.active = true;
    await setListeners([...listeners]);
    // send request to api
    const response = await request(`listeners/${id}/start`, "POST");
    const responseData = await response.json();
    showNotification(responseData.message, responseData.status);
  }

  async function stopListener(id) {
    showNotification("Stopping listener.", "info");
    const listener = listeners.find((listener) => listener.id === id);
    listener.active = false;
    setListeners([...listeners]);
    // send request to api
    const response = await request(`listeners/${id}/stop`, "POST");
    const responseData = await response.json();
    showNotification(responseData.message, responseData.status);
  }

  async function restartListener(id) {
    showNotification("Restarting listener.", "info");
    const listener = listeners.find((listener) => listener.id === id);
    listener.active = false;
    setListeners([...listeners]);
    // send request to api
    const response = await request(`listeners/${id}/restart`, "POST");
    const responseData = await response.json();
    // set status to active
    listener.active = true;
    setListeners([...listeners]);
    showNotification(responseData.message, responseData.status);
  }

  async function deleteListener(id) {
    // remove listener from list
    const listener = listeners.find((listener) => listener.id === id);
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
    setListeners([...listeners]);
    // send request to api
    const response = await request(`listeners/${id}/remove`, "DELETE");
    const responseData = await response.json();
    showNotification(responseData.message, responseData.status);
  }

  useEffect(() => {
    async function getListenerTypes() {
      const response = await request("listeners/available");
      const listenerTypesData = await response.json();
      setListenerTypes(listenerTypesData.listeners);
    }
    async function getListeners() {
      const response = await request("listeners");
      const listenersData = await response.json();
      setListeners(listenersData.listeners);
    }
    getListeners();
    getListenerTypes();
    const interval = setInterval(getListeners, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Active</th>
              <th>Name</th>
              <th>Address</th>
              <th>Port</th>
              <th>Type</th>
              <th>SSL</th>
              <th>Enabled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listeners &&
              listeners.map((listener) => (
                <tr className="dark-background" key={listener.id}>
                  <td>{listener.id}</td>
                  <td>
                    <i
                      title="Active"
                      className="material-icons"
                      // set color to green if listener is active and red if not
                      style={{
                        color: listener.active ? "green" : "red",
                        marginTop: "4px",
                        marginLeft: "4px",
                      }}
                    >
                      circle
                    </i>
                  </td>
                  <td>{listener.name}</td>
                  <td>{listener.address}</td>
                  <td>{listener.port}</td>
                  <td>{listener.type}</td>
                  <td>{listener.ssl ? "✅" : "❌"}</td>
                  <td>{listener.enabled ? "✅" : "❌"}</td>
                  <td>
                    {!listener.active && (
                      <button
                        type="button"
                        className="btn btn-success"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Start"
                        onClick={() => startListener(listener.id)}
                      >
                        <i className="material-icons">play_arrow</i>
                      </button>
                    )}
                    {listener.active && (
                      <button
                        type="button"
                        className="btn btn-info"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Restart"
                        onClick={() => restartListener(listener.id)}
                      >
                        <i className="material-icons">restart_alt</i>
                      </button>
                    )}
                    {listener.active && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Stop"
                        onClick={() => stopListener(listener.id)}
                      >
                        <i className="material-icons">stop</i>
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={() => deleteListener(listener.id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            {listeners.lenght === 0 && (
              <tr className="dark-background">
                <td colSpan="9">No listeners found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {Object.keys(listenerTypes).length > 0 && (
        <>
          <button
            type="button"
            className="btn btn-warning"
            data-toggle="modal"
            data-target="#create-modal"
          >
            Create a new listener
          </button>
          <div
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
            id="create-modal"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content dark-background">
                <div className="modal-header">
                  <h5 className="modal-title" id="ModalLongTitle">
                    Create a new listener
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <TypeSwitcher listenerTypes={listenerTypes} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
