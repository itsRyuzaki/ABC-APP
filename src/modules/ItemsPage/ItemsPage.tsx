import { useFetch } from "../../hooks/useFetch";
import { IPageLoadConfig } from "../../interfaces/IPageConfig";
import Items from "../../shared/Items/Items";
import { useLoaderData } from "react-router-dom";

export function Component() {
  const { CONFIG } = useLoaderData() as { CONFIG: IPageLoadConfig };
  const { response } = useFetch(CONFIG.fetchEndpoint, null, [
    CONFIG.fetchEndpoint,
  ]);
  return (
    <>
      {response.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Items itemList={response.data} />
      )}
    </>
  );
}

Component.displayName = "Mobiles";
