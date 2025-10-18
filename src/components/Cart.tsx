import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { removeAll } from "../store/cartSlice";
import data from "../data/data.json";
import type { RootState, AppDispatch } from "../store";
import type { TDessert } from "../types/types";
import CartItem from "./CartItem";
import ModalContent from "./Modal";

const byId = new Map<number, TDessert>(
  (data as TDessert[]).map((d) => [d.id, d])
);

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: RootState) => state.cart.desserts);

  const count = cart.reduce((sum, n) => sum + n.count, 0);
  const total = cart.reduce((sum, n) => {
    const item = byId.get(n.id);
    return item ? sum + item.price * n.count : sum;
  }, 0);

  const handleCloseModal = () => {
    dispatch(removeAll());
    setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) {
      return;
    }

    const { style } = document.body;
    if (showModal) style.overflow = "hidden";
    else style.overflow = "";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(!showModal);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      style.overflow = "";
    };
  }, [showModal]);

  return (
    <aside className="cart">
      <h2 className="cart__title">
        Your Cart <span>({count})</span>
      </h2>

      {count > 0 ? (
        <>
          <div>
            {cart.map(({ id, count }) => {
              const product = byId.get(id);
              if (!product) return null; // unknown id in cart
              const { name, price } = product;

              return (
                <CartItem
                  count={count}
                  name={name}
                  price={price}
                  id={id}
                  key={id}
                />
              );
            })}
          </div>
          <div className="cart__attributes">
            <div className="cart__total">
              <span>Order Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <div className="cart__carbon-neutral">
              <img
                src="images/icon-carbon-neutral.svg"
                alt=""
                width={20}
                height={20}
              />
              <span>
                This is a <strong>carbon-neutral</strong> delivery
              </span>
            </div>
            <button
              className="button button--secondary"
              onClick={() => setShowModal(true)}>
              Confirm Order
            </button>
          </div>
          {showModal &&
            createPortal(
              <ModalContent
                onClose={handleCloseModal}
                onCloseModal={() => setShowModal(false)}
              />,
              document.body
            )}
        </>
      ) : (
        <div className="cart__empty">
          <img
            src="images/illustration-empty-cart.svg"
            alt=""
            width={128}
            height={128}
          />
          Your added items will appear here
        </div>
      )}
    </aside>
  );
};

export default Cart;
