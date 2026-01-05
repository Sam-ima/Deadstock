import { Routes, Route } from "react-router-dom";
import RootLayout from "./root_layout";
import LandingPage from "./pages/landingPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AuctionsPage from "./pages/auction.page";
import Profile from "./pages/profilePage";
import CategoryPage from "./pages/categoryPage.jsx";
import ProductDetailPage from "./pages/productdetail.page";
import AuthPage from "./pages/authPage.jsx";
import darkTheme from "./theme/darkTheme";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;
