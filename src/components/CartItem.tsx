import { useDispatch } from "react-redux";
import { removeItem } from "../store/cartSlice";
import type { AppDispatch } from "../store";
import type { TDessert } from "../types/types";
import { formatCurrency } from "../utils/currency";
import { calculateLineItemTotal } from "../utils/cartUtils";

interface PassedProps extends Pick<TDessert, "name" | "price" | "id"> {
  count: number;
}

const CartItem = ({ name, price, count, id }: PassedProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const total = calculateLineItemTotal(price!, count);

  const handleRemove = () => {
    dispatch(removeItem({ id, all: true }));
  };

  return (
    <div className="cart-item">
      <span className="cart-item__name">{name}</span>
      <span className="cart-item__details">
        <span className="cart-item__count">{count}x</span>
        <span className="cart-item__single-price">
          @ {formatCurrency(price!)}
        </span>
        <span className="cart-item__total">{formatCurrency(total)}</span>
      </span>
      <span
        className="cart-item__remove"
        onClick={handleRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10">
          <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
        </svg>
      </span>
    </div>
  );
};

export default CartItem;
