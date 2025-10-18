import { useSelector } from "react-redux";
import DessertButton from "./DessertButton";
import type { TDessert } from "../types/types";
import type { RootState } from "../store";

interface PassedProps {
  dessert: TDessert;
}

type Dessert = {
  id: TDessert["id"];
  count: number;
};

const Dessert = ({ dessert }: PassedProps) => {
  const price = Number(dessert.price).toFixed(2);
  const cart = useSelector((state: RootState) => state.cart.desserts);
  const i = cart.findIndex((d) => d.id === dessert.id);

  let count;
  if (i !== -1) {
    count = cart[i].count;
  }

  const style = `dessert__image ${
    count ? "dessert__image--active" : undefined
  }`;

  return (
    <li
      key={dessert.category}
      className="dessert">
      <div>
        <div className={style}>
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={dessert.image.desktop}
              type="image/webp"
            />
            <source
              media="(min-width: 500px)"
              srcSet={dessert.image.tablet}
              type="image/webp"
            />
            <img
              src={dessert.image.mobile}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <DessertButton id={dessert.id} />
      </div>
      <div>
        <span className="dessert__category">{dessert.category}</span>
        <span className="dessert__name">{dessert.name}</span>
        <span className="dessert__price">${price}</span>
      </div>
    </li>
  );
};

export default Dessert;
