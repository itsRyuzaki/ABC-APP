import { useEffect, useState } from "react";
import { fetchData } from "../services/accessories-service";
import { ApiResponse } from "../interfaces/IApiResponse";

export function useFetch<T, R>(endpoint: string, payload: T, dependencies: any[] = []) {
  const [response, setResponse] = useState<ApiResponse<R>>({
    data: null,
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    async function getData() {
      const response: ApiResponse<R> = await fetchData(endpoint);
      setResponse(response);
    }
    getData();
  }, dependencies);

  return {
    response,
  };
}
