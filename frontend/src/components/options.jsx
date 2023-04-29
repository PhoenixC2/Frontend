import { useEffect, useState } from "react";
import Info from "./info";

export default function OptionsForm(props) {
  const [type, setType] = useState(props.type);
  const [element, setElement] = useState(props.element); // Element is the element to edit

  useEffect(() => {
    setType(props.type);
    setElement(props.element);
  }, [props]);
  const isEdit = element !== undefined;


  return (
    <div className="container">
      <form onSubmit={props.handleSubmit}>
        <Info type={type} />
        {element === undefined && <input type="hidden" name="type" value={type.name} />}
        {type.options.length > 0 && (
          <>
            {type.options.map((option) => (
              <div key={option.real_name}>
                {option.type === "boolean" && (
                  <div className="form-check" key={option.real_name}>
                    <label className="form-check-label text-primary">
                      <input type="hidden" name={option.real_name} value="off" />
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={option.real_name}
                        defaultChecked={isEdit ? element[option.real_name] : option.default}
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
                  <div className="form-group"key={option.real_name}>
                    <label className="text-primary" htmlFor={option.real_name}>{option.name}</label>
                    <input
                      list="addresses"
                      className="form-control"
                      type="text"
                      name={option.real_name}
                      defaultValue={isEdit ? element[option.real_name] : option.default}
                    />
                    <datalist id="addresses">
                      {Object.keys(option.type_data.interfaces).map(
                        (net_interface) => (
                          <option value={net_interface} key={net_interface}>
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
                  <div className="form-group" key={option.real_name}>
                    <label className="text-primary" htmlFor={option.real_name}>{option.name}</label>
                    <input
                      className="form-control md-label-static"
                      type="number"
                      name={option.real_name}
                      defaultValue={isEdit ? element[option.real_name] : option.default}
                      min={1}
                      max={65535}
                    />
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "choice" && (
                  <div className="form-group" key={option.real_name}>
                    <label className="text-primary" htmlFor={option.real_name}>{option.name}</label>
                    <select className="form-control" name={option.real_name}>
                      {Object.keys(option.type_data.choices).map((choice) => (
                        <option selected={choice === option.default} value={choice} key={choice}>
                          {choice}
                        </option>
                      ))}
                    </select>
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "table" && (
                  <div className="form-group" key={option.real_name}>
                    <label className="text-primary" htmlFor={option.real_name}>{option.name}</label>
                    <select className="form-control" name={option.real_name}>
                      {Object.keys(option.type_data.choices).map((choice) => (
                        <option value={choice} key={choice}>{choice}</option>
                      ))}
                    </select>
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "string" && (
                  <div className="form-group" key={option.real_name}>
                    <label className="text-primary" htmlFor={option.real_name}>{option.name}</label>
                    <input
                      className="form-control"
                      type="text"
                      name={option.real_name}
                      defaultValue={isEdit ? element[option.real_name] : option.default}
                    />
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
                {option.type === "integer" && (
                  <div className="form-group" key={option.real_name}>
                    <label className="text-primary" htmlFor={option.real_name}>{option.name}</label>
                    <input
                      className="form-control"
                      type="number"
                      name={option.real_name}
                      defaultValue={isEdit ? element[option.real_name] : option.default}
                    />
                    <small className="form-text text-muted">
                      {option.description}
                    </small>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Edit" : "Create"}
        </button>
        {!isEdit && (
          <button type="reset" className="btn btn-danger">
            Reset
          </button>
        )}
      </form>
    </div>
  );
}
