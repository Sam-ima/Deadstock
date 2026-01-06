import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";
import auctionReducer from "./slice/auctionSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auction: auctionReducer,  
  },
});

export default store;
