import { useEffect, useState } from "react";
import { fetchData } from "../services/accessories-service";
import { ApiResponse, RawApiResponse } from "../interfaces/IApiResponse";

export function useFetch<T, R>(
  endpoint: string,
  payload: T,
  dependencies: any[] = []
) {
  const [response, setResponse] = useState<ApiResponse<R>>({
    data: null,
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    async function getData() {
      const response: RawApiResponse<R> = await fetchData<R>(endpoint);
      setResponse({
        data: response.data,
        isLoading: false,
        hasError: !response.success,
      });
    }
    getData();
  }, dependencies);

  return {
    response,
  };
}
