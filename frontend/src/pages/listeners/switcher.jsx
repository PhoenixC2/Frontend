import { useState } from "react";
import creationForm from "./options";

export default function TypeSwitcher(props) {
  // form to switch between listener types
  const [listenerTypes] = useState(props.listenerTypes);
  const [listenerType, setListenerType] = useState(
    Object.values(listenerTypes)[0]
  );

  function handleChange(event) {
    setListenerType(listenerTypes[event.target.value]);
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
              <small className="form-text text-muted">
                Choose the listener type you want to create.
              </small>
            </div>
          </form>
          {creationForm({ listenerType })}
        </div>
      )}
    </>
  );
}
