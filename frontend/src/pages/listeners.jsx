import Cookies from "js-cookie";
import { Component } from "react";
import { redirect } from "react-router-dom";

class Listeners extends Component {
  state = {
    listeners: [],
  };

  constructor(props) {
    super(props);
    this.get_data();
  }

  async get_data() {
    fetch("http://localhost:8080/listeners?json=true", {
      headers: {
        "Api-Key": Cookies.get("api_key"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ listeners: data.listeners });
      });
  }

  render() {
    if (Cookies.get("api_key") === undefined) {
      return redirect("/login");
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.listeners.map((listener) => (
              <tr key={listener.id}>
                <td>{listener.id}</td>
                <td>{listener.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Listeners;
