import "./Items.css";
import Button from "../../shared/Button/Button";
import { IAccessoryList } from "../../interfaces/IAccessoryModels";
import { FC } from "react";
import { useAppSelector } from "../../store/store-hooks";
import { UserRole } from "../../enums/UserRoleEnum";
import { Link } from "react-router-dom";

interface IItemsComponent {
  itemList: IAccessoryList[];
}

const Items: FC<IItemsComponent> = ({ itemList }) => {
  const userRole = useAppSelector((state) => state.authorization.userRole);

  return (
    <ul className="items-wrapper w-full list-none my-8 mx-auto justify-items-center">
      {itemList.map((data) => (
        <li
          key={data.id}
          className="item rounded-2xl overflow-hidden shadow-xl w-full max-w-80 lg:max-w-96"
        >
          <Link to={`${data.id}`}>
            <article className="flex flex-col justify-between">
              <img
                src={data.imageURLs[0]}
                alt={data.name}
                className="min-w-80 max-w-96 h-72 object-contain border-b border-white"
              />
              <div className="mx-8">
                <h3>{data.name}</h3>
                <p className="item-price">{data.price}</p>
                <p className="item-description">{data.description}</p>
              </div>
            </article>
          </Link>
          <p className="item-actions">
            <Button>View Details</Button>

            {userRole !== UserRole.admin ? (
              <Button>Add to Cart</Button>
            ) : (
              <Button>Edit details</Button>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Items;
