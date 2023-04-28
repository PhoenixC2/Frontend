import Cookies from "js-cookie";

export function getPictureUrl(operations_id) {
  return `/api/operations/${operations_id}/picture?api_key=${Cookies.get(
    "api_key"
  )}`;
}
