import { createSlice } from "@reduxjs/toolkit";

/* ----------------------------------------
   Local Storage Helpers
---------------------------------------- */

const loadCartFromStorage = () => {
  if (typeof window === "undefined") return {};

  try {
    const savedCart = JSON.parse(localStorage.getItem("deadstock_cart"));
    if (savedCart && typeof savedCart === "object" && !Array.isArray(savedCart)) {
      return savedCart;
    }
    return {};
  } catch {
    return {};
  }
};

const saveCartToStorage = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("deadstock_cart", JSON.stringify(items));
  }
};

// Generate a unique key for each cart addition
const generateCartItemKey = (item) => `${item.id}_${item.unitPrice}_${Date.now()}`;

/* ----------------------------------------
   Slice
---------------------------------------- */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
    showSuccess: false,
    successMessage: "",
    successProduct: null,
    lastAdded: null,
  },

  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      if (!state.items || Array.isArray(state.items)) {
        state.items = {};
      }

          const unitPrice =
          typeof item.unitPrice === "number"
          ? item.unitPrice
          : typeof item.price === "number"
          ? item.price
          : 0;


      // Always create a new cart item (no merging)
      const newKey = generateCartItemKey(item);

      state.items[newKey] = {
        id: item.id,
        name: item.name,
        product: item.product,
        quantity: item.quantity,
        unitPrice,
        totalPrice: unitPrice * item.quantity,
        isBulkOrder: item.isBulkOrder ?? false,
        cartItemId: newKey,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveCartToStorage(state.items);

      state.showSuccess = true;
      state.successMessage = `${item.name} added to cart!`;
      state.successProduct = item;
      state.lastAdded = new Date().toISOString();
    },

    updateItemQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;

      if (state.items[cartItemId]) {
        state.items[cartItemId].quantity = quantity;
        state.items[cartItemId].totalPrice =
          quantity * state.items[cartItemId].unitPrice;
        state.items[cartItemId].updatedAt = new Date().toISOString();

        saveCartToStorage(state.items);
      }
    },

    removeItem: (state, action) => {
      delete state.items[action.payload];
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = {};
      saveCartToStorage({});
    },

    hideSuccessMessage: (state) => {
      state.showSuccess = false;
      state.successMessage = "";
      state.successProduct = null;
    },

    updateCartItem: (state, action) => {
      const { cartItemId, updates } = action.payload;

      if (state.items[cartItemId]) {
        state.items[cartItemId] = {
          ...state.items[cartItemId],
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        saveCartToStorage(state.items);
      }
    },
  },
});

/* ----------------------------------------
   Exports
---------------------------------------- */

export const {
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  hideSuccessMessage,
  updateCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
