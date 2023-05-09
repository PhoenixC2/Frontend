import { useEffect, useState } from "react";

export default function Info(props) {
  // Info card for the listener type
  const [type, setType] = useState(props.type);

  useEffect(() => {
    setType(props.type);
  }, [props]);
    
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title text-primary">{type.name}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{type.description}</p>
        {props.additionalInfo}
        {type.features && type.features.length > 0 && (
          <>
            <h6 className="card-subtitle">Features</h6>
            <ul className="list-group">
              {type.features.map((feature) => (
                <li className="list-group-item" key={feature.name}>
                  {feature.pro ? "✅" : "❌"}{" "}
                  <span className="badge badge-primary">{feature.name}</span>
                  {/* description */}
                  <p className="card-text">{feature.description}</p>
                </li>
              ))}
            </ul>

          </>
          
        )}
        {/* author */}
        <small className="text-muted">Created by: {type.author}</small>
      </div>
    </div>
  );
}
