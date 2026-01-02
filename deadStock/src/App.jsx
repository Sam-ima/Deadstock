import { Routes, Route } from "react-router-dom";
import MainLayout from "./component/main_layout";
import DeadstockMarketplace from "./pages/home_page";
import AuctionsPage from "./pages/auction.page";
import CategoryPage from "./pages/category.page";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DeadstockMarketplace />} />
        <Route path="/auctions" element={<AuctionsPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
