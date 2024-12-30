import Items from "../../components/Items/Items";
import { usePost } from "../../hooks/usePost";
import { IItemsList } from "../../interfaces/IApiModels";
import { IPageLoadConfig } from "../../interfaces/IPageConfig";
import { useLoaderData } from "react-router-dom";

export function Component() {
  const { CONFIG } = useLoaderData() as { CONFIG: IPageLoadConfig };
  const { response } = usePost<null, IItemsList[]>(CONFIG.fetchEndpoint, null, [
    CONFIG.fetchEndpoint,
  ]);
  return (
    <>
      {response.isLoading ? (
        <p>Loading...</p>
      ) : response.data?.length ? (
        <Items itemList={response.data} />
      ) : (
        <p>No data found</p>
      )}
    </>
  );
}

Component.displayName = "Mobiles";
