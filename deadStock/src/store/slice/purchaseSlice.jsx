import { createSlice } from "@reduxjs/toolkit";

// Load from session storage on initial state
const loadFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("directPurchaseItem");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading from session storage:", err);
    return null;
  }
};

const saveToSessionStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("directPurchaseItem", serializedState);
  } catch (err) {
    console.error("Error saving to session storage:", err);
  }
};

const initialState = {
  directPurchaseItem: loadFromSessionStorage(),
  isLoading: false,
  error: null,
};

const directPurchaseSlice = createSlice({
  name: "directPurchase",
  initialState,
  reducers: {
    setDirectPurchaseItem: (state, action) => {
      state.directPurchaseItem = action.payload;
      saveToSessionStorage(action.payload);
    },
    clearDirectPurchaseItem: (state) => {
      state.directPurchaseItem = null;
      sessionStorage.removeItem("directPurchaseItem");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateDirectPurchaseQuantity: (state, action) => {
      if (!state.directPurchaseItem) return;

      const { quantity } = action.payload;
      state.directPurchaseItem.quantity = quantity;
      state.directPurchaseItem.totalPrice =
        state.directPurchaseItem.unitPrice * quantity;

      saveToSessionStorage(state.directPurchaseItem);
    },

    removeDirectPurchaseItem: (state) => {
      state.directPurchaseItem = null;
      sessionStorage.removeItem("directPurchaseItem");
    },
  },
});

export const {
  setDirectPurchaseItem,
  clearDirectPurchaseItem,
  setLoading,
  setError,updateDirectPurchaseQuantity,removeDirectPurchaseItem
} = directPurchaseSlice.actions;

export default directPurchaseSlice.reducer;
