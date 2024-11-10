import { useEffect, useState } from "react";
import { postData } from "../services/accessories-service";

export function usePost(endpoint, payload, dependencies = []) {
  const [response, setResponse] = useState({
    data: null,
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    async function callPostApi() {
      const response = await postData(endpoint, payload);
      setResponse(response);
    }

    callPostApi();
  }, dependencies);

  return {
    response,
  };
}
