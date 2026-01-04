import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import MainLayout from "./layout/main_layout";
import DeadstockMarketplace from "./pages/home_page";
import AuctionsPage from "./pages/auction.page";
import Profile from "./pages/profilePage";
import CategoryPage from "./pages/category.page";
import ProductDetailPage from "./pages/productdetail.page";

import darkTheme from "./theme/darkTheme";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DeadstockMarketplace />} />
        <Route path="/auctions" element={<AuctionsPage />} />

        {/* ✅ Dark theme ONLY for profile */}
        <Route
          path="/profile"
          element={
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Profile />
            </ThemeProvider>
          }
        />

        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug/:title" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
