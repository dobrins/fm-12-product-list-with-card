import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import type { AppDispatch, RootState } from "../store";
import { getCartItemCount } from "../utils/cartUtils";
import cartImg from "../../public/images/icon-add-to-cart.svg";

interface PassedProps {
  id: number;
}

const DessertButton = ({ id }: PassedProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: RootState) => state.cart.desserts);
  const count = getCartItemCount(cart, id);

  return (
    <div className="dessert__button">
      {count ? (
        <div className="plus-minus">
          <span
            className="plus-minus__minus"
            onClick={() => dispatch(removeItem({ id }))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              fill="none"
              viewBox="0 0 10 2">
              <path d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          </span>
          {count}
          <span
            className="plus-minus__plus"
            onClick={() => dispatch(addItem({ id }))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10">
              <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
            </svg>
          </span>
        </div>
      ) : (
        <button
          className="button"
          onClick={() => dispatch(addItem({ id }))}>
          <img
            src={cartImg}
            alt=""
            width={20}
            height={20}
          />
          Add to cart
        </button>
      )}
    </div>
  );
};

export default DessertButton;
