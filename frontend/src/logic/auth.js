import Cookies from "js-cookie";
import request from "./api";

export function logout() {
  Cookies.remove("api_key");
}

export default async function fetchUser() {
  const response = await request("users/user?unseen=true", "GET");
  const data = await response.json();
  if (response.status === 200) {
    console.log(data)
    return data.user;
  } else {
    throw new Error(data.message);
  }
}