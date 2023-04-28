import { useState } from "react";

export default function Info(props) {
  // Info card for the listener type
  const [type] = useState(props.type);
  return (
    <div className="card dark-background">
      <div className="card-header">
        <h5 className="card-title text-primary">{type.name}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{type.description}</p>
        {type.features && (
          <>
            <h6 className="card-subtitle mb-2 text-muted">Features</h6>
            <ul className="list-group list-group-flush">
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
        <p className="card-text">
          <small className="text-muted">Created by: {type.author}</small>
        </p>
      </div>
    </div>
  );
}
