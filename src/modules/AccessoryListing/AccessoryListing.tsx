import Items from "../../components/Items/Items";
import { usePost } from "../../hooks/usePost";
import { IAccessoryList } from "../../interfaces/IAccessoryModels";
import { IPageLoadConfig } from "../../interfaces/IPageConfig";
import { useLoaderData } from "react-router-dom";

const AccessoryListingComponent = () => {
  const { CONFIG } = useLoaderData() as { CONFIG: IPageLoadConfig };
  const { response } = usePost<any, IAccessoryList[]>(
    CONFIG.fetchEndpoint,
    { type: CONFIG.type },
    [CONFIG.type]
  );
  return (
    <>
      {response.isLoading ? (
        <p>Loading...</p>
      ) : response.data?.length ? (
        <Items itemList={response.data} />
      ) : (
        <p>
          Didn't find what you were looking for? Try changing your filter
        </p>
      )}
    </>
  );
};

export default AccessoryListingComponent;
