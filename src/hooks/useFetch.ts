import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchData } from "../services/accessories-service";
import { ApiResponse, RawApiResponse } from "../interfaces/IApiResponse";

export function useFetch<R>(
  endpoint: string,
  payload: Record<string, string> = {},
  dependencies: any[] = []
): [ApiResponse<R>, Dispatch<SetStateAction<ApiResponse<R>>>] {
  const [response, setResponse] = useState<ApiResponse<R>>({
    data: null,
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    async function getData() {
      const response: RawApiResponse<R> = await fetchData<R>(endpoint, payload);
      setResponse({
        data: response.data,
        isLoading: false,
        hasError: !response.success,
      });
    }
    getData();
  }, dependencies);

  return [response, setResponse];
}
