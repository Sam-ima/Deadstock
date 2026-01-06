// src/redux/auctionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  bids: {}, // { [productId]: bidAmount }
  selectedImages: {}, // { [productId]: selectedImageUrl }
};

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      if (state.wishlist.includes(productId)) {
        state.wishlist = state.wishlist.filter((id) => id !== productId);
      } else {
        state.wishlist.push(productId);
      }
    },
    setBid: (state, action) => {
      const { productId, amount } = action.payload;
      state.bids[productId] = amount;
    },
    setSelectedImage: (state, action) => {
      const { productId, imageUrl } = action.payload;
      state.selectedImages[productId] = imageUrl;
    },
  },
});

export const { toggleWishlist, setBid, setSelectedImage } = auctionSlice.actions;
export default auctionSlice.reducer;
