import Cookies from "js-cookie";
import request from "./api";
import showNotification from "./notify";
export function getPictureUrl(operations_id) {
  return `/api/operations/${operations_id}/picture?api_key=${Cookies.get(
    "api_key"
  )}`;
}

export async function setCurrentOperation(operation_id) {
  const response = await request(
    `operations/${operations_id}/change`,
    "PUT");
  const data = await response.json();

  showNotification(data.message, data.status);

}
  
