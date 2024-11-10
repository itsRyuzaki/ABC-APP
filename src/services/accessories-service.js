import { BASE_PATH } from "../config/endpoints";
import axiosInstance from "../interceptors/http-interceptor";

export async function fetchData(endpoint) {
  try {
    const rawResponse = await fetch([BASE_PATH, endpoint].join("/"));
    const data = await rawResponse.json();
    return validateResponse(data);
  } catch (error) {
    handleErrorResponse(endpoint, error);
  }
}

export async function postData(endpoint, payload) {
  try {
    const response = await axiosInstance.post(endpoint, payload);
    return validateResponse(response);
  } catch (error) {
    handleErrorResponse(endpoint, error);
  }
}

function validateResponse(data) {
  if (data?.success) {
    return { data, hasError: false, isLoading: false };
  } else {
    throw new Error(
      `Error occured while fetching data: ${
        data?.errorDetails ?? "Unknown Error"
      }`
    );
  }
}

function handleErrorResponse(endpoint, error) {
  console.error(`FETCH DATA - ${endpoint}`);
  console.error(error);
  return { data: null, hasError: true, isLoading: false };
}
