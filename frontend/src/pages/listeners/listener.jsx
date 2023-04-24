import { useEffect, useState } from "react";
import showNotification from "../../logic/notify";
import request from "../../logic/api";

export default function Listener(props) {
  const [listener, setListener] = useState(props.listener);
  const [listeners, setListeners] = useState(props.listeners);
  const setParentListeners = props.setListeners;
  const setCurrentEditListener = props.setCurrentEditListener;

  useEffect(() => {
    setListener(props.listener);
    setListeners(props.listeners);
  }, [props.listener, props.listeners]);

  // show edit modal
  function showEditModal() {
    setCurrentEditListener(listener.id);
    document.getElementById(`edit-modal-${listener.id}-button`).click();
  }
  // management functions
  async function start() {
    showNotification("Starting listener.", "info");

    listener.active = true;
    await setParentListeners([...listeners]);

    const response = await request(`listeners/${listener.id}/start`, "POST");
    const responseData = await response.json();

    showNotification(responseData.message, responseData.status);
  }

  async function stop() {
    showNotification("Stopping listener.", "info");

    listener.active = false;
    setParentListeners([...listeners]);

    const response = await request(`listeners/${listener.id}/stop`, "POST");
    const responseData = await response.json();

    showNotification(responseData.message, responseData.status);
  }

  async function restart() {
    showNotification("Restarting listener.", "info");

    listener.active = false;
    setParentListeners([...listeners]);

    const response = await request(`listeners/${listener.id}/restart`, "POST");
    const responseData = await response.json();

    listener.active = true;
    setParentListeners([...listeners]);

    showNotification(responseData.message, responseData.status);
  }

  async function remove() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
    setParentListeners([...listeners]);

    const response = await request(`listeners/${listener.id}/remove`, "DELETE");
    const responseData = await response.json();

    showNotification(responseData.message, responseData.status);
  }
  return (
    <>
      {listener && (
        <tr className="dark-background">
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
                onClick={start}
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
                onClick={restart}
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
                onClick={stop}
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
              onClick={showEditModal}
            >
              <i className="material-icons">edit</i>
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
              onClick={remove}
            >
              <i className="material-icons">delete</i>
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
