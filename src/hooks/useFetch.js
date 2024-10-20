import { useEffect, useState } from "react";
import { fetchData } from "../services/accessories-service";

export function useFetch(endpoint, payload, dependencies = []) {
  const [response, setResponse] = useState({
    data: null,
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    async function setData() {
      const response = await fetchData(endpoint);
      setResponse(response);
    }
    setData();
  }, dependencies);

  return {
    response,
  };
}
