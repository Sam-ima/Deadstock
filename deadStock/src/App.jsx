import { lazy, Suspense } from "react";
import "./global.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import { CartProvider } from "./component/categoryPage/productDetail/cartContext.jsx";
import { AuthProvider } from "./context/authContext/authContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import { CategoryProvider } from "./context/categoryContext.jsx";

import RootLayout from "./root_layout";
import AuthPage from "./pages/authPage.jsx";
import SellItem from "./pages/sellProduct";
import CartPage from "./pages/cart.page.jsx";
// Lazy pages
const LandingPage = lazy(() => import("./pages/landingPage"));
const AuctionsPage = lazy(() => import("./pages/auction.page"));
const ProfilePage = lazy(() => import("./pages/profilePage"));
const SellerProfilePage = lazy(() => import("./pages/sellerProfilePage.jsx"));
const CategoryPage = lazy(() => import("./pages/categoryPage.jsx"));
const AuctionDetailPage = lazy(() => import("./pages/auctionDetailPage.jsx"));
const CheckoutPage = lazy(() => import("./pages/checkout.page.jsx"));

const ProductDescriptionPage = lazy(() =>
  import("./pages/productDescriptionPage.jsx")
);
const ResetPassword = lazy(() =>
  import("./component/forms/passwordReset/resetPassword.jsx")
);
const HowToSell = lazy(() => import("./pages/howToSellPage.jsx"));

/* ---------- Router ---------- */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/sellerProfile" element={<SellerProfilePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/how-to-sell" element={<HowToSell />} />
      <Route path="/sell-item" element={<SellItem />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/product/:slug" element={<ProductDescriptionPage />} />
      <Route path="/product/:id/:title" element={<AuctionDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <ProductProvider>
          {/* <CartProvider> */}
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <RouterProvider router={router} />
              <ToastContainer transition={Flip} />
            </Suspense>
          {/* </CartProvider> */}
        </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
