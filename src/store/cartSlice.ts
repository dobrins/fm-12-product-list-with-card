import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TDessert } from "../types/types";

type Dessert = Pick<TDessert, "id"> & {
  count: number;
};

type DessertState = {
  desserts: Dessert[];
};

type RemoveItem = {
  id: TDessert["id"];
  all?: boolean;
  empty?: boolean;
};

type AddItem = {
  id: TDessert["id"];
};

const initialState: DessertState = {
  desserts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // when click the "+" button it adds the ID and the number of items
    addItem({ desserts }, { payload: { id } }: PayloadAction<AddItem>) {
      const i = desserts.findIndex((d) => d.id === id);
      if (i === -1) {
        desserts.push({ id, count: 1 });
      } else {
        desserts[i].count += 1;
      }
    },
    // when click the "-" button it removes by one count from the ID
    removeItem(
      { desserts },
      { payload: { id, all } }: PayloadAction<RemoveItem>
    ) {
      const i = desserts.findIndex((d) => d.id === id);

      if (all) {
        desserts.splice(i, 1);
        return;
      }

      if (i === -1) {
        return;
      }

      if (desserts[i].count > 1) {
        desserts[i].count -= 1;
      } else {
        desserts.splice(i, 1);
      }
    },
    // Empty the cart
    removeAll({ desserts }) {
      desserts.splice(0);
    },
  },
});

export const { addItem, removeItem, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
