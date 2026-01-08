import { lazy, Suspense } from "react";
import "./global.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Context Providers
import { CartProvider } from './component/categoryPage/productDetail/cartContext.jsx';
import { AuthProvider } from './component/categoryPage/productDetail/authContext.jsx';

import RootLayout from "./root_layout";
// import AuctionsPage from "./pages/auction.page";
// import Profile from "./pages/profilePage";
// import CategoryPage from "./pages/categoryPage.jsx";
// import ProductDetailPage from "./pages/productdetail.page";

import AuthPage from "./pages/authPage.jsx";
import AddToCart from "./pages/cart.page.jsx";
import Checkout from "./pages/checkout.page.jsx";

/* ---------- Lazy Loaded Pages ---------- */
const LandingPage = lazy(() => import("./pages/landingPage"));
const AuctionsPage = lazy(() => import("./pages/auction.page"));
const ProfilePage = lazy(() => import("./pages/profilePage"));
const CategoryPage = lazy(() => import("./pages/categoryPage.jsx"));
const AuctionDetailPage = lazy(() => import("./pages/auctionDetailPage.jsx"));
const ProductDescriptionPage = lazy(() => import("./pages/productDescriptionPage.jsx"));
const ResetPassword = lazy(() =>
  import("./component/forms/passwordReset/resetPassword.jsx")
);
const HowToSell = lazy(() => import("./pages/howToSellPage.jsx"));

/* ---------- Router Configuration ---------- */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* auth */}
      <Route path="auth" element={<AuthPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/how-to-sell" element={<HowToSell />} />
      {/* Category Routes */}
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />  
      <Route path="/product/:slug" element={<ProductDescriptionPage/>} />
      {/* Product Detail */}
      <Route path="/product/:id/:title" element={<AuctionDetailPage />} />
       <Route path="/cart" element={<AddToCart />} />
       <Route path="/checkout" element={<Checkout />} />

      
    </Route>
  )
);

function App() {
  return (
    // Wrap everything with AuthProvider and CartProvider
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <RouterProvider router={router} />

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
            transition={Flip}
          />
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;