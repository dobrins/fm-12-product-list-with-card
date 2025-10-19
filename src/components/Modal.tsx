import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import data from "../data/data.json";
import type { RootState } from "../store";
import type { TDessert } from "../types/types";
import { formatCurrency } from "../utils/currency";
import { createDessertMap, calculateCartTotal } from "../utils/cartUtils";
import CartItemModal from "./CartItemModal";

const byId = createDessertMap(data as TDessert[]);

interface PassedProps {
  onClose: () => void;
  onCloseModal: () => void;
}

const Modal = ({ onClose, onCloseModal }: PassedProps) => {
  const cart = useSelector((state: RootState) => state.cart.desserts);

  const backdropRef = useRef<HTMLDivElement>(null);

  const total = calculateCartTotal(cart, byId);

  useEffect(() => {
    const el = backdropRef.current;
    if (!el) return;

    const onClick = (e: MouseEvent) => {
      if (e.target === el) {
        onCloseModal();
      }
    };

    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [onCloseModal]);

  return (
    <div
      className="backdrop"
      ref={backdropRef}>
      <div className="modal">
        <div>
          <img
            src="/images/icon-order-confirmed.svg"
            alt=""
            width={48}
            height={48}
          />
          <h2 className="modal__title">Order Confirmed</h2>
          <p className="modal__subtitle">We hope you enjoy your food!</p>
        </div>
        <div className="modal__items">
          <div>
            {cart.map(({ id, count }, index) => {
              const product = byId.get(id);
              if (!product) return null; // unknown id in cart
              const { name, price, image } = product;

              return (
                <React.Fragment key={id}>
                  <CartItemModal
                    count={count}
                    name={name}
                    price={price}
                    thumbnail={image.thumbnail}
                  />
                  {cart.length > index + 1 && <hr />}
                </React.Fragment>
              );
            })}
          </div>
          <hr />
          <div className="cart__total">
            <span>Order Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>
        <button
          onClick={onClose}
          className="button button--secondary">
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Modal;
