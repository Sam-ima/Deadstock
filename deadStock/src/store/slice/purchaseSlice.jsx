// store/slice/directPurchaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  directPurchaseItem: null,
  isLoading: false,
  error: null,
};

const directPurchaseSlice = createSlice({
  name: 'directPurchase',
  initialState,
  reducers: {
    setDirectPurchaseItem: (state, action) => {
      state.directPurchaseItem = action.payload;
    },
    clearDirectPurchaseItem: (state) => {
      state.directPurchaseItem = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDirectPurchaseItem,
  clearDirectPurchaseItem,
  setLoading,
  setError,
} = directPurchaseSlice.actions;

export default directPurchaseSlice.reducer;