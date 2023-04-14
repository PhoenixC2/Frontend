import request from "./api";

export default async function fetchUser() {
  const response = await request("users/user", "GET");
  const data = await response.json();
  if (response.status === 200) {
    return data.user;
  } else {
    throw new Error(data.message);
  }
}