import request from "./api";
import Cookies from "js-cookie";

export default async function fetchUser() {
  const response = await request("users/user", "GET");
  const data = await response.json();
  if (response.status === 200) {
    return data.user;
  } else {
    throw new Error(data.message);
  }
}

export function getPictureUrl(id){
  return `/api/users/${id}/picture?api_key=${Cookies.get("api_key")}`
}