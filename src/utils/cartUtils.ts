import type { TDessert } from "../types/types";

type CartItem = {
  id: number;
  count: number;
};

/**
 * Creates a Map for quick dessert lookup by ID
 */
export const createDessertMap = (
  desserts: TDessert[]
): Map<number, TDessert> => {
  return new Map(desserts.map((d) => [d.id, d]));
};

/**
 * Calculates the total price of all items in the cart
 */
export const calculateCartTotal = (
  cart: CartItem[],
  dessertMap: Map<number, TDessert>
): number => {
  return cart.reduce((sum, item) => {
    const dessert = dessertMap.get(item.id);
    return dessert ? sum + dessert.price * item.count : sum;
  }, 0);
};

/**
 * Gets the count of a specific item in the cart
 * Returns undefined if the item is not in the cart
 */
export const getCartItemCount = (
  cart: CartItem[],
  id: number
): number | undefined => {
  const item = cart.find((d) => d.id === id);
  return item?.count;
};

/**
 * Calculates the total price for a line item (price * quantity)
 */
export const calculateLineItemTotal = (price: number, count: number): number => {
  return count * price;
};
