import { useState } from "react";

export default function Info(props){
    // Info card for the listener type
    const [listenerType] = useState(props.listenerType);
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title text-warning">{listenerType.name}</h5>
            </div>
            <div className="card-body">
                <p className="card-text">{listenerType.description}</p>
                <h6 className="card-subtitle mb-2 text-muted">Features</h6>
                <ul className="list-group list-group-flush">
                    {listenerType.features.map((feature) => (
                        <li className="list-group-item">
                            {feature.pro ? "✅" : "❌"}{" "}
                            <span className="badge badge-primary">{feature.name}</span>
                            {/* description */}
                            <p className="card-text">{feature.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}