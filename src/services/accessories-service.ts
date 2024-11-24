import { BASE_PATH } from "../config/endpoints";
import axiosInstance from "../interceptors/http-interceptor";
import { RawApiResponse } from "../interfaces/IApiResponse";

export async function fetchData<R>(endpoint: string) {
  try {
    const rawResponse = await fetch([BASE_PATH, endpoint].join("/"));
    const data = await rawResponse.json();
    return validateResponse<R>(data);
  } catch (error) {
    return handleErrorResponse(endpoint, error);
  }
}

export async function postData<P, R>(endpoint: string, payload: P) {
  try {
    const response = await axiosInstance.post(endpoint, payload);
    return validateResponse<R>(response.data);
  } catch (error) {
    return handleErrorResponse(endpoint, error);
  }
}

function validateResponse<T>(response: RawApiResponse<T>) {
  if (response?.success) {
    return { data: response.data, hasError: false, isLoading: false };
  } else {
    throw new Error(
      `Error occured while fetching data: ${
        response?.errorDetails ?? "Unknown Error"
      }`
    );
  }
}

function handleErrorResponse(endpoint: string, error: any) {
  console.error(`FETCH DATA - ${endpoint}`);
  console.error(error);
  return { data: null, hasError: true, isLoading: false };
}
