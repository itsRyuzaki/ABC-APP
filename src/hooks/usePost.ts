import { useEffect, useState } from "react";
import { postData } from "../services/accessories-service";
import { ApiResponse } from "../interfaces/IApiResponse";

export function usePost<P, R>(endpoint: string, payload: P, dependencies:any[] = []) {
  const [response, setResponse] = useState<ApiResponse<R>>({
    data: null,
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    async function callPostApi() {
      const response = await postData<P, R>(endpoint, payload);
      setResponse({
        data: response.data,
        isLoading: false,
        hasError: !response.success
      });
    }

    callPostApi();
  }, dependencies);

  return {
    response,
  };
}
