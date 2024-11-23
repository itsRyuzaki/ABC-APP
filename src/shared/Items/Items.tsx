import "./Items.css";
import { BASE_PATH } from "../../config/endpoints";
import Button from "../Button/Button";

export default function Items({ itemList }) {
  return (
    <ul className="items-wrapper">
      {itemList?.map((data) => (
        <li key={data.id} className="item">
          <article>
            <img src={`${BASE_PATH}/${data.image}`} alt={data.name} />
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
}
