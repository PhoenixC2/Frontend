import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import request from "../logic/api";
import getUser from "../logic/auth";
import showNotification from "../logic/notify";

export default function LoginForm() {
  const navigate = useNavigate();
  const [useApiKey, setUseApiKey] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      showNotification(searchParams.get("error"), "danger");
    }
  }, []);

  async function login() {
    let response;
    if (useApiKey) {
      response = request(`auth/login?api_key=${apiKey}`, "POST");
    } else {
      response = request("auth/login", "POST", {
        username: username,
        password: password,
      });
    }
    response
      .then((response) => {
        response.json().then((data) => {
          showNotification(data.message, data.status);
          if (data.status === "success") {
            Cookies.set("api_key", data.user.api_key, {
              sameSite: "none",
              secure: true,
            });
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        });
      })
      .catch((error) => {
        showNotification(error, "danger");
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center text-warning">PhoenixC2</h3>
            </div>
            <div className="card-body">
              <form>
                {useApiKey ? (
                  <div className="form-group">
                    <label htmlFor="apiKey">API Key</label>
                    <input
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter API Key"
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </>
                )}
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue={useApiKey}
                      onChange={(e) => setUseApiKey(e.target.checked)}
                    />
                    Use API Key
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn-warning btn-block"
                  onClick={login}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
