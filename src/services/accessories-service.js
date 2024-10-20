import { BASE_PATH } from "../config/endpoints";

export async function fetchData(endpoint) {
  try {
    const rawResponse = await fetch([BASE_PATH, endpoint].join("/"));
    const data = await rawResponse.json();
    if (rawResponse.ok) {
      return { data, hasError: false, isLoading: false };
    } else {
      throw new Error(
        `Error occured while fetching data: ${
          data?.errorDetails ?? "Unknown Error"
        }`
      );
    }
  } catch (error) {
    console.error(`FETCH DATA - ${endpoint}`);
    console.error(error);
    return { data: null, hasError: true, isLoading: false };
  }
}
