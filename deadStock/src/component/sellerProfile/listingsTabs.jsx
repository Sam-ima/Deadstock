import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
// import ListingCard from "./ListingCard";
import { useNavigate } from "react-router-dom";
import { getProductsBySeller } from "../../services/productService";
import ProductCard from "../categoryPage/product/productCard/productCard";

const ListingsTabs = ({ sellerId }) => {
  // console.log("seller id ", sellerId);
  const navigate = useNavigate();
  const [tab, setTab] = useState("selling");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (!sellerId || tab === "add") return;

  // Clear previous products immediately
  setProducts([]);
  setLoading(true);

  const fetchProducts = async () => {
    try {
      const status = tab === "selling" ? "active" : "sold";
      const data = await getProductsBySeller(sellerId, status);
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [sellerId, tab]);


  return (
    <>
      {/* TABS */}
      <Box mt={4} display="flex" justifyContent="center">
        <ToggleButtonGroup
          value={tab}
          exclusive
          onChange={(_, v) => v && setTab(v)}
          sx={{
            bgcolor: "#F5F7F6",
            p: 0.7,
            borderRadius: "999px",
            gap: 1,

            "& .MuiToggleButton-root": {
              border: "none",
              px: 3,
              py: 1.2,
              borderRadius: "999px !important",
              fontWeight: 600,
              textTransform: "none",
            },

            "& .Mui-selected": {
              color: "#fff !important",
              background: "linear-gradient(135deg, #2e7d32, #ff8f00)",
            },
          }}
        >
          <ToggleButton value="selling">🟢 Selling</ToggleButton>
          <ToggleButton value="sold">🟠 Sold</ToggleButton>
          <ToggleButton value="add" onClick={() => navigate("/sell-item")}>
            ➕ Add Product
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* LISTINGS */}
      <Box
        mt={4}
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        }}
        gap={3}
      >
        {loading && (
          <Typography textAlign="center">Loading products...</Typography>
        )}

        {!loading && products.length === 0 && (
          <Typography textAlign="center">No products found.</Typography>
        )}

        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </Box>
    </>
  );
};

export default ListingsTabs;
