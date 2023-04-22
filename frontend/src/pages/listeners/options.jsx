import { useEffect, useState } from "react";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import Info from "./info";

export default function creationForm(props) {
  const [listenerType, setListenerType] = useState(props.listenerType);

  useEffect(() => {
    // update the listener type when the props change
    setListenerType(props.listenerType);
  }, [props.listenerType]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const response = await request("listeners/add", "POST", data);
    const responseData = await response.json();
    showNotification(responseData.message, responseData.status);
  }
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="border border-primary rounded p-3"
      >
        <Info listenerType={listenerType} />
        <input type="hidden" name="type" value={listenerType.name} />
        {listenerType.options.length > 0 && (
          <>
            {listenerType.options.map((option) => (
              <>
                {option.type === "boolean" && (
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={option.real_name}
                      />
                      {option.name}
                      <span className="form-check-sign">
                        <span className="check"></span>
                      </span>
                    </label>
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "address" && (
                  <div className="form-group">
                    <label htmlFor={option.real_name}>{option.name}</label>
                    <input
                      list="addresses"
                      className="form-control"
                      type="text"
                      name={option.real_name}
                      defaultValue={option.default}
                    />
                    <datalist id="addresses">
                      {Object.keys(option.type_data.interfaces).map(
                        (net_interface) => (
                          <option value={net_interface}>
                            {net_interface}:{" "}
                            {option.type_data.interfaces[net_interface]}
                          </option>
                        )
                      )}
                    </datalist>
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "port" && (
                  <div className="form-group">
                    <label htmlFor={option.real_name}>{option.name}</label>
                    <input
                      className="form-control"
                      type="number"
                      name={option.real_name}
                      defaultValue={option.default}
                      min={1}
                      max={65535}
                    />
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "choice" && (
                  <div className="form-group">
                    <label htmlFor={option.real_name}>{option.name}</label>
                    <select className="form-control" name={option.real_name}>
                      {Object.keys(option.type_data.choices).map((choice) => (
                        <option value={choice}>{choice}</option>
                      ))}
                    </select>
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "table" && (
                  <div className="form-group">
                    <label htmlFor={option.real_name}>{option.name}</label>
                    <select className="form-control" name={option.real_name}>
                      {Object.keys(option.type_data.choices).map((choice) => (
                        <option value={choice}>{choice}</option>
                      ))}
                    </select>
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "string" && (
                  <div className="form-group">
                    <label htmlFor={option.real_name}>{option.name}</label>
                    <input
                      className="form-control"
                      type="text"
                      name={option.real_name}
                      defaultValue={option.default}
                    />
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "integer" && (
                  <div className="form-group">
                    <label htmlFor={option.real_name}>{option.name}</label>
                    <input
                      className="form-control"
                      type="number"
                      name={option.real_name}
                      defaultValue={option.default}
                    />
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
              </>
            ))}
          </>
        )}
        <p>Created by: {listenerType.author}</p>
        <button type="submit" className="btn btn-warning">
          Create Listener
        </button>
        <button type="reset" className="btn btn-danger">
          Reset
        </button>
      </form>
    </div>
  );
}