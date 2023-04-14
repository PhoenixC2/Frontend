import { Component, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate} from "react-router-dom";
import request from "../logic/api";

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);

  async function login() {
    await request("auth/login", "POST", {
      username: username,
      password: password,
    }).
    then((response) => {
      response.json().then((data) => {
        if (data.status === "success") {
          Cookies.set("api_key", data.user.api_key, {
            sameSite: "none",
            secure: true,
          });
        }
        setSuccess(data.status === "success");
        if (data.status === "success") {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      });
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
                <button
                  type="button"
                  className="btn btn-warning btn-block"
                  onClick={login}
                >
                  Login
                </button>
                {success === false && (
                  <div className="alert alert-danger mt-3">
                    Invalid username or password
                  </div>
                )}
                {success === true && (
                  <div className="alert alert-success mt-3">
                    Login successful, redirecting...
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
