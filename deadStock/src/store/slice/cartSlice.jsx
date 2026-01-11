// src/store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // { id: { product, quantity } }
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const id = product.id;

      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = {
          product,
          quantity: 1,
        };
      }
    },

    decreaseItem: (state, action) => {
      const id = action.payload;
      if (state.items[id].quantity > 1) {
        state.items[id].quantity -= 1;
      } else {
        delete state.items[id];
      }
    },

    removeItem: (state, action) => {
      delete state.items[action.payload];
    },
  },
});

export const { addItem, decreaseItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
