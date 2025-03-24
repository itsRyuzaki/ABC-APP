import { BASE_PATH } from "../config/endpoints";
import axiosInstance from "../interceptors/http-interceptor";
import { RawApiResponse } from "../interfaces/IApiResponse";

export async function fetchData<R>(
  endpoint: string,
  payload: Record<string, string> = {}
): Promise<RawApiResponse<R>> {
  try {
    const queryParams = new URLSearchParams(payload).toString();
    const rawResponse = await fetch(
      `${[BASE_PATH, endpoint].join("/")}${
        queryParams ? `?${queryParams}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    return await rawResponse.json();
  } catch (error) {
    return handleErrorResponse<R>(endpoint, error);
  }
}

export async function postData<P, R>(
  endpoint: string,
  payload: P
): Promise<RawApiResponse<R>> {
  try {
    return await axiosInstance.post<P, RawApiResponse<R>>(endpoint, payload);
  } catch (error) {
    return handleErrorResponse(endpoint, error);
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
    errorDetails:
      error instanceof Error
        ? { code: 450, details: [error.message] }
        : undefined,
  };
}
