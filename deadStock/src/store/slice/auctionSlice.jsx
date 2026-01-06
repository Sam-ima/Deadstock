import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: null,
  isWishlisted: false,
  bidAmount: 0,
  snackbar: {
    open: false,
    message: "",
  },
};

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.selectedProduct = action.payload;
      state.bidAmount = action.payload.currentBid + 10;
    },
    toggleWishlist(state) {
      state.isWishlisted = !state.isWishlisted;
    },
    updateBid(state, action) {
      state.bidAmount = action.payload;
    },
    showSnackbar(state, action) {
      state.snackbar = { open: true, message: action.payload };
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
    },
  },
});

export const {
  setProduct,
  toggleWishlist,
  updateBid,
  showSnackbar,
  closeSnackbar,
} = auctionSlice.actions;

export default auctionSlice.reducer;
