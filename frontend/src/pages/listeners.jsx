import { useEffect, useState } from "react";
import request from "../logic/api";

function TypeSwitcher(props) {
  // form to switch between listener types
  const [listenerTypes, setListenerTypes] = useState(props.listenerTypes);
  const [listenerType, setListenerType] = useState(Object.values(listenerTypes)[0]);

  async function handleChange(event) {
    // get key of listener type
    const choosenType = listenerTypes.find(
      (type) => type.type === event.target.value
    );
    setListenerType(choosenType);
  }

  return (
    <>
    {Object.keys(listenerTypes).length > 0 && (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Listener Type</label>
          <select className="form-control" onChange={handleChange}>
            {Object.keys(listenerTypes).map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </form>
      {createListener({ listenerType: listenerType })}
    </div>
    )}
    </>
  );
}

function createListener(props) {
  const [listenerType, setListenerType] = useState(props.listenerType);

  async function handleSubmit(event) {
    // change to json
    const data = new FormData(event.target);
    const json = JSON.stringify(Object.fromEntries(data.entries()));
    console.log(json);
    // send json to api
    event.preventDefault();
    const response = await request("listeners/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    });
    const responseData = await response.json();
    console.log(responseData);
  }
  console.log(listenerType.options);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="type" value={listenerType.type} />
        {listenerType.options.map((option) => (
          <>
            {option.type === "boolean" && (
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={option.real_name}
                    checked={option.default}
                  />
                  {option.name}
                </label>
              </div>
            )}
            {option.type === "string" && (
              <div className="form-group">
                <label>{option.name}</label>
                <input
                  className="form-control"
                  type="text"
                  name={option.real_name}
                  value={option.default}
                />
              </div>
            )}
            {option.type === "integer" && (
              <div className="form-group">
                <label>{option.name}</label>
                <input
                  className="form-control"
                  type="number"
                  name={option.real_name}
                  value={option.default}
                />
              </div>
            )}
          </>
        ))}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
export default function Listeners(props) {
  const [listeners, setListeners] = useState([]);
  const [listenerTypes, setListenerTypes] = useState([]);

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
                    <button type="button" className="btn btn-warning">
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {!listeners && (
              <tr className="dark-background">
                <td colSpan="9">No listeners found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {Object.keys(listenerTypes).length > 0 && (
      <>
      <button type="button"
            className="btn btn-warning"
            data-toggle="modal"
            data-target="#create-modal">
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
              <div className="modal-footer">
                <input
                  type="button"
                  id="create-button"
                  value="Create"
                  className="btn btn-success"
                />
                <input type="reset" value="Reset" className="btn btn-danger" />
              </div>
            </div>
          </div>
        </div>
      </>
      )}
    </>
  );
}