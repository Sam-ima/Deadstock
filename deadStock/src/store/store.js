import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";
import auctionReducer from "./slice/auctionSlice";
import directPurchaseReducer from './slice/purchaseSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auction: auctionReducer, 
    directPurchase: directPurchaseReducer, 
  },
});

export default store;
