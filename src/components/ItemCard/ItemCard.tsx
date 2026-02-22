import "./ItemCard.css";
import Button from "../../shared/Button/Button";
import { IAccessoriesDetails } from "../../interfaces/IAccessoryModels";
import { FC, useState } from "react";
import { useAppSelector } from "../../store/store-hooks";
import { UserRole } from "../../enums/UserRoleEnum";
import { Link } from "react-router-dom";
import { BLOB_PATH, IMG_UNAVAILABLE_PATH } from "../../config/endpoints";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

interface IItemCardComponent {
  itemDetail: IAccessoriesDetails;
  onItemRemove: () => void;
  onItemAdd: () => void;
}

const ItemCard: FC<IItemCardComponent> = ({ itemDetail, onItemAdd, onItemRemove }) => {
  const userRole = useAppSelector((state) => state.authorization.userRole);
  const [itemCount, setItemCount] = useState(0);

  const handleAddCartClick = () => {
    setItemCount(1);
    onItemAdd();
  };

  const onRemoveItem = () => {
    setItemCount((prevCount) => prevCount - 1);
    onItemRemove();
  };

  const onAddItem = () => {
    setItemCount((prevCount) => prevCount + 1);
    onItemAdd();
  };

  return (
    <>
      <Link to={`${itemDetail.accessoryGuid}`}>
        <article className="flex flex-col justify-between">
          <img
            src={`${BLOB_PATH}${
              itemDetail.imageDetails?.[0]?.source ?? IMG_UNAVAILABLE_PATH
            }`}
            alt={itemDetail.imageDetails?.[0]?.altText}
            className="min-w-80 max-w-96 h-72 object-contain border-b border-white"
          />
          <div className="mx-4">
            <h3>{itemDetail.name}</h3>
            <p className="item-description">{itemDetail.description}</p>
            <div className="flex items-center gap-2">
              <p className="item-price">{itemDetail.discountedPrice}</p>
              {itemDetail.originalPrice > itemDetail.discountedPrice ? <p className="line-thorugh">{itemDetail.originalPrice}</p> : <></>}
              {itemDetail.availableCount < 10 ? <p>Only {itemDetail.availableCount} left!</p> : <></>}
            </div>
          </div>
        </article>
        <div
          className="flex justify-center my-4 px-4"
          onClick={(event) => event.preventDefault()}
        >
          {userRole !== UserRole.admin ? (
            <>
              {itemCount === 0 ? (
                <Button classOverrides={["w-full"]} onClick={handleAddCartClick}>
                  Add to Cart
                </Button>
              ) : (
                <div className="flex justify-between items-center w-full rounded-md outline">
                  <IconButton
                    aria-label="Decrease Count"
                    onClick={onRemoveItem}
                  >
                    <RemoveIcon />
                  </IconButton>
                  {itemCount}
                  <IconButton
                    aria-label="Increase Count"
                    onClick={onAddItem}
                    disabled={itemCount === itemDetail.availableCount}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              )}
            </>
          ) : (
            <Button>Edit details</Button>
          )}
        </div>
      </Link>
    </>
  );
};

export default ItemCard;
