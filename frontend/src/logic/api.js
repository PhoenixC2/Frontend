import Cookies from "js-cookie";

export default function request(route, method, body) {
  return fetch("http://localhost:8080/api/" + route, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Api-Key": Cookies.get("api_key") || "",
    },
  });
}