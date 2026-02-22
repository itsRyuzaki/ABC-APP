import ItemCard from "../../components/ItemCard/ItemCard";
import { usePost } from "../../hooks/usePost";
import { IAccessoriesDetails } from "../../interfaces/IAccessoryModels";
import { IPageLoadConfig } from "../../interfaces/IPageConfig";
import { useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { addToCart, removeFromCart } from "../../store/CartSlice";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

const AccessoryListingComponent = () => {
  const { CONFIG } = useLoaderData() as { CONFIG: IPageLoadConfig };
  const { response } = usePost<any, IAccessoriesDetails[]>(
    CONFIG.fetchEndpoint,
    { type: CONFIG.type },
    [CONFIG.type],
  );
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartDetails.items);
  return (
    <>
      {cartItems.length ? (
        <Fab
          color="primary"
          aria-label="Shopping Cart"
          className="fixed! bottom-8 right-8"
        >
          <Badge badgeContent={cartItems.length} color="secondary" max={9}>
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      ) : (
        <></>
      )}
      {response.isLoading ? (
        <p>Loading...</p>
      ) : response.data?.length ? (
        <ul className="items-wrapper w-full list-none my-8 mx-auto justify-items-center">
          {response.data.map((itemDetail) => (
            <li
              key={itemDetail.accessoryGuid}
              className="item rounded-2xl overflow-hidden shadow-xl w-full max-w-80 lg:max-w-96"
            >
              <ItemCard
                itemDetail={itemDetail}
                onItemAdd={() => dispatch(addToCart(itemDetail))}
                onItemRemove={() =>
                  dispatch(removeFromCart(itemDetail.accessoryGuid))
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Didn't find what you were looking for? Try changing your filter</p>
      )}
    </>
  );
};

export default AccessoryListingComponent;
