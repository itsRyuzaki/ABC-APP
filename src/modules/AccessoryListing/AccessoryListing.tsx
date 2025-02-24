import Items from "../../components/Items/Items";
import { usePost } from "../../hooks/usePost";
import { IAccessoryList } from "../../interfaces/IAccessoryModels";
import { IPageLoadConfig } from "../../interfaces/IPageConfig";
import { useLoaderData } from "react-router-dom";

const AccessoryListingComponent = () => {
  const { CONFIG } = useLoaderData() as { CONFIG: IPageLoadConfig };
  const { response } = usePost<null, IAccessoryList[]>(CONFIG.fetchEndpoint, null, [
    CONFIG.fetchEndpoint,
  ]);
  return (
    <>
      {response.isLoading ? (
        <p>Loading...</p>
      ) : response.data?.length ? (
        <Items itemList={response.data} />
      ) : (
        <p>
          No data found
          <Items
            itemList={[
              {
                id: 1,
                name: "hello",
                description: "som",
                price: "123",
                imageURLs: [
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21255-DUmnkxSx65ie.png",
                ],
              },
              {
                id: 1,
                name: "hello",
                description: "som",
                price: "123",
                imageURLs: [
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21255-DUmnkxSx65ie.png",
                ],
              },
              {
                id: 1,
                name: "hello",
                description: "som",
                price: "123",
                imageURLs: [
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21255-DUmnkxSx65ie.png",
                ],
              },
            ]}
          />
        </p>
      )}
    </>
  );
};

export default AccessoryListingComponent;
