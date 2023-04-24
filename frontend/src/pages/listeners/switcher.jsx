import { useState } from "react";
import OptionsForm from "../../components/options";

export default function TypeSwitcher(props) {
  const [name] = useState(props.name);
  const [description] = useState(props.description);
  const [types] = useState(props.types);
  const [handleSubmit] = useState(props.handleSubmit);
  const [type, setType] = useState(Object.values(types)[0]);

  function handleChange(event) {
    setType(types[event.target.value]);
  }
  return (
    <>
      {Object.keys(types).length > 0 && (
        <div className="container">
          <form>
            <div className="form-group">
              <label>{name}</label>
              <select className="form-control" onChange={handleChange}>
                {Object.keys(types).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <small className="form-text text-muted">{description}</small>
            </div>
          </form>
        </div>
      )}
      {type !== undefined && (
        <OptionsForm type={type} handleSubmit={handleSubmit} />
      )}
    </>
  );
}
