import "./Items.css";
import { BASE_PATH } from "../../config/endpoints";
import Button from "../../shared/Button/Button";
import { IItemsList } from "../../interfaces/IApiModels";
import { FC } from "react";

interface IItemsComponent {
  itemList: IItemsList[];
}

const Items: FC<IItemsComponent> = ({ itemList }) => {
  return (
    <ul className="items-wrapper">
      {itemList.map((data) => (
        <li key={data.id} className="item">
          <article>
            <img src={`${BASE_PATH}/${data.imageURLs[0]}`} alt={data.name} />
            <div>
              <h3>{data.name}</h3>
              <p className="item-price">{data.price}</p>
              <p className="item-description">{data.description}</p>
            </div>
            <p className="item-actions">
              <Button>Edit</Button>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default Items;
