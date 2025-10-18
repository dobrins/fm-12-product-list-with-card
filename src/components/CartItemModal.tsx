import type { TDessert } from "../types/types";

interface PassedProps extends Pick<TDessert, "name" | "price"> {
  count: number;
  thumbnail: TDessert["image"]["thumbnail"];
}

const CartItemModal = ({ name, price, count, thumbnail }: PassedProps) => {
  const total = count * price!;

  return (
    <div className="cart-item-modal">
      <div className="cart-item-modal__thumbnail">
        <img
          src={thumbnail}
          alt=""
          width={48}
          height={48}
        />
      </div>
      <span className="cart-item-modal__name">{name}</span>
      <span className="cart-item-modal__details">
        <span className="cart-item-modal__count">{count}x</span>
        <span className="cart-item-modal__single-price">
          @ ${Number(price).toFixed(2)}
        </span>
      </span>
      <span className="cart-item-modal__total">
        ${Number(total).toFixed(2)}
      </span>
    </div>
  );
};

export default CartItemModal;
