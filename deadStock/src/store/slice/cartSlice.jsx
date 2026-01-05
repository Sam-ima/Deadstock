import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      state[product.id] = state[product.id]
        ? state[product.id] + 1
        : 1;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      if (state[id] > 1) state[id]--;
      else delete state[id];
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
