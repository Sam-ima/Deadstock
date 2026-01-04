import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import MainLayout from "./layout/main_layout";
import DeadstockMarketplace from "./pages/home_page";
import AuctionsPage from "./pages/auction.page";
import Profile from "./pages/profilePage";
// import CategoryPage from "./pages/category.page";
import CategoryPage from "./pages/categoryPage/categoriesPage";
import ProductDetailPage from "./pages/productdetail.page";

import darkTheme from "./theme/darkTheme";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DeadstockMarketplace />} />
        <Route path="/auctions" element={<AuctionsPage />} />
        <Route
          path="/profile"
          element={
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Profile />
            </ThemeProvider>
          }
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug/:title" element={<ProductDetailPage />} />
      </Route>
    </Routes>   
  );
}

export default App;
