import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home_page";
import CategoryPage from "./pages/category.page";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;