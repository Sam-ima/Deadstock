import { Routes, Route } from "react-router-dom";
import RootLayout from "./root_layout";
import LandingPage from "./pages/landingPage";
import AuctionsPage from "./pages/auction.page";
import Profile from "./pages/profilePage";
// import CategoryPage from "./pages/category.page";
import CategoryPage from "./pages/categoryPage.jsx";
import ProductDetailPage from "./pages/productdetail.page";


function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auctions" element={<AuctionsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug/:title" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
