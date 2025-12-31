import { Routes, Route } from "react-router-dom";
import MainLayout from "./component/main_layout";
import DeadstockMarketplace from "./pages/home_page";
import AuctionsPage from "./pages/auction.page";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DeadstockMarketplace />} />
        <Route path="/auctions" element={<AuctionsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
