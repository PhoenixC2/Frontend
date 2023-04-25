import Cookies from "js-cookie";

export default function request(route, method, body) {
  return fetch("/api/" + route, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Api-Key": Cookies.get("api_key") || "",
    },
  });
}


export async function getData(route) {
  const response = await request(route, "GET");
  if (response.status === 200) {
    return await response.json();
  }
  return [];
}