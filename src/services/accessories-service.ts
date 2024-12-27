import { BASE_PATH } from "../config/endpoints";
import axiosInstance from "../interceptors/http-interceptor";
import { RawApiResponse } from "../interfaces/IApiResponse";

export async function fetchData<R>(
  endpoint: string
): Promise<RawApiResponse<R>> {
  try {
    const rawResponse = await fetch([BASE_PATH, endpoint].join("/"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await rawResponse.json();
    return validateResponse<R>(data);
  } catch (error) {
    return handleErrorResponse<R>(endpoint, error);
  }
}

export async function postData<P, R>(
  endpoint: string,
  payload: P
): Promise<RawApiResponse<R>> {
  try {
    const response = await axiosInstance.post(endpoint, payload);
    return validateResponse<R>(response.data);
  } catch (error) {
    return handleErrorResponse(endpoint, error);
  }
}

function validateResponse<T>(response: RawApiResponse<T>) {
  if (response?.success) {
    return response;
  } else {
    throw new Error(
      `Error occured while fetching data: ${
        response?.errorDetails ?? "Unknown Error"
      }`
    );
  }
}

function handleErrorResponse<R>(
  endpoint: string,
  error: Error | unknown
): RawApiResponse<R> {
  console.error(`FETCH DATA - ${endpoint}`);
  console.error(error);
  return {
    data: null,
    success: false,
    errorDetails: error instanceof Error ? [error.message] : [],
  };
}
