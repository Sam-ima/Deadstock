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
const generateCartItemKey = (item) => `${item.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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

      const unitPrice = typeof item.unitPrice === "number"
        ? item.unitPrice
        : typeof item.price === "number"
        ? item.price
        : typeof item.product?.price === "number"
        ? item.product.price
        : 0;

      const quantity = typeof item.quantity === "number" ? item.quantity : 1;

      // Always create a new cart item (no merging)
      const newKey = generateCartItemKey(item);
      const now = new Date().toISOString();

      state.items[newKey] = {
        id: item.id,
        name: item.name || item.product?.name || "Product",
        product: item.product,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: unitPrice * quantity,
        isBulkOrder: item.isBulkOrder ?? false,
        cartItemId: newKey,
        addedAt: now,
        updatedAt: now,
      };

      saveCartToStorage(state.items);

      state.showSuccess = true;
      state.successMessage = `${state.items[newKey].name} added to cart!`;
      state.successProduct = item;
      state.lastAdded = now;
      
      console.log("➕ Item added to cart:", {
        key: newKey,
        name: state.items[newKey].name,
        quantity,
        unitPrice,
        totalPrice: unitPrice * quantity,
        addedAt: now
      });
    },

    updateItemQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;

      if (state.items[cartItemId]) {
        const newQuantity = Math.max(1, quantity);
        state.items[cartItemId].quantity = newQuantity;
        state.items[cartItemId].totalPrice = newQuantity * state.items[cartItemId].unitPrice;
        state.items[cartItemId].updatedAt = new Date().toISOString();

        saveCartToStorage(state.items);
        
        console.log("✏️ Item quantity updated:", {
          cartItemId,
          newQuantity,
          totalPrice: state.items[cartItemId].totalPrice
        });
      }
    },

    removeItem: (state, action) => {
      const cartItemId = action.payload;
      if (state.items[cartItemId]) {
        console.log("🗑️ Removing item:", cartItemId, state.items[cartItemId].name);
        delete state.items[cartItemId];
        saveCartToStorage(state.items);
      }
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