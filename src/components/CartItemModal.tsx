import type { TDessert } from "../types/types";
import { formatCurrency } from "../utils/currency";
import { calculateLineItemTotal } from "../utils/cartUtils";

interface PassedProps extends Pick<TDessert, "name" | "price"> {
  count: number;
  thumbnail: TDessert["image"]["thumbnail"];
}

const CartItemModal = ({ name, price, count, thumbnail }: PassedProps) => {
  const total = calculateLineItemTotal(price!, count);

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
          @ {formatCurrency(price!)}
        </span>
      </span>
      <span className="cart-item-modal__total">
        {formatCurrency(total)}
      </span>
    </div>
  );
};

export default CartItemModal;
