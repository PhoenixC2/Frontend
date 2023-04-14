import { useEffect, useState } from "react";
import request from "../logic/api";

export default function Modules(props) {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    async function getModules() {
      const response = await request("modules?full=true");
      const modulesData = await response.json();
      console.log(modulesData);
      setModules(modulesData.modules);
    }
    if (modules.length === 0) {
      getModules();
    }
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Language</th>
            <th>Admin required</th>
          </tr>
        </thead>
        <tbody>
          {modules &&
            modules.map((module) => (
              <tr className="dark-background" key={module.name}>
                <td>{module.name}</td>
                <td>{module.description}</td>
                <td>{module.language}</td>
                <td>{module.enabled ? "✅" : "❌"}</td>
              </tr>
            ))}
          {!modules && (
            <tr className="dark-background">
              <td colSpan="9">No modules found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
