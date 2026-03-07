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
          : typeof item.product?.price === "number"
          ? item.product.price
          : 0;

      const quantity = typeof item.quantity === "number" ? item.quantity : 1;

      // ✅ Use stable key: productId + unitPrice (same product/price = same cart slot)
      const stableKey = `${item.id}_${unitPrice}`;
      const now = new Date().toISOString();

      if (state.items[stableKey]) {
        // ✅ Product already in cart — just increase quantity
        const existing = state.items[stableKey];
        const newQuantity = existing.quantity + quantity;

        state.items[stableKey] = {
          ...existing,
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity,
          updatedAt: now,
        };

        console.log("➕ Quantity increased:", {
          key: stableKey,
          name: existing.name,
          newQuantity,
          totalPrice: unitPrice * newQuantity,
        });
      } else {
        // ✅ New product — create fresh cart entry
        state.items[stableKey] = {
          id: item.id,
          name: item.name || item.product?.name || "Product",
          product: item.product,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
          isBulkOrder: item.isBulkOrder ?? false,
          cartItemId: stableKey,
          addedAt: now,
          updatedAt: now,
        };

        console.log("🆕 New item added to cart:", {
          key: stableKey,
          name: state.items[stableKey].name,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
        });
      }

      saveCartToStorage(state.items);

      state.showSuccess = true;
      state.successMessage = `${state.items[stableKey].name} added to cart!`;
      state.successProduct = item;
      state.lastAdded = now;
    },

    updateItemQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;

      if (state.items[cartItemId]) {
        const newQuantity = Math.max(1, quantity);
        state.items[cartItemId].quantity = newQuantity;
        state.items[cartItemId].totalPrice =
          newQuantity * state.items[cartItemId].unitPrice;
        state.items[cartItemId].updatedAt = new Date().toISOString();

        saveCartToStorage(state.items);

        console.log("✏️ Item quantity updated:", {
          cartItemId,
          newQuantity,
          totalPrice: state.items[cartItemId].totalPrice,
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

export const {
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  hideSuccessMessage,
  updateCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;