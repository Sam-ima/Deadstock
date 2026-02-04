import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getProductsBySeller,
  deleteProduct,
  updateProduct,
} from "../../../services/productService";
import { useNavigate } from "react-router-dom";
import ListingsGrid from "./listingGrid";
import EditProductDialog from "./editProductDialog/EditProductDialog";
import ConfirmDialog from "./confirmationDialog";

const ListingsTabs = ({ sellerId }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("selling");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    if (!sellerId || tab === "add") return;

    setLoading(true);
    getProductsBySeller(sellerId, tab === "selling" ? "active" : "sold")
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [sellerId, tab]);

  const handleDelete = async () => {
    await deleteProduct(deleteProductId);
    setProducts((p) => p.filter((x) => x.id !== deleteProductId));
    setDeleteProductId(null);
  };

  const handleUpdate = async (data) => {
    await updateProduct(data.id, data);
    setProducts((p) => p.map((x) => (x.id === data.id ? data : x)));
    setEditProduct(null);
  };

  // 🔥 NEW: Toggle bidding handler
  const handleToggleBidding = async (productId, isDepreciating) => {
    await updateProduct(productId, { isDepreciating });

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isDepreciating } : p)),
    );
  };

  return (
    <>
      {/* Tabs */}
      <Box mt={4} display="flex" justifyContent="center">
        <ToggleButtonGroup
          value={tab}
          exclusive
          onChange={(_, v) => v && setTab(v)}
          sx={{
            bgcolor: "#F5F7F6",
            p: 0.5,
            borderRadius: "999px",
            gap: 1.5,
            "& .MuiToggleButton-root": {
              border: "none",
              px: 3,
              py: 1.5,
              borderRadius: "999px !important",
              fontWeight: 600,
              textTransform: "none",
              color: "#333",
              "&:hover": { bgcolor: "#e0f2f1" },
            },
            "& .Mui-selected": {
              color: "#fff !important",
              background: "linear-gradient(135deg, #2e7d32, #ff8f00)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            },
          }}
        >
          <ToggleButton value="selling">🟢 Selling</ToggleButton>
          <ToggleButton value="sold">🟠 Sold</ToggleButton>
          <ToggleButton value="add" onClick={() => navigate("/how-to-sell")}>
            ➕ Add Product
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Content */}
      <Box mt={4}>
        {loading && (
          <Typography textAlign="center">Loading products...</Typography>
        )}

        {!loading && products.length === 0 && (
          <Typography textAlign="center">No products found.</Typography>
        )}

        {!loading && products.length > 0 && (
          <ListingsGrid
            products={products}
            onEdit={setEditProduct}
            onDelete={setDeleteProductId}
            onToggleBidding={handleToggleBidding}
          />
        )}
      </Box>

      {/* Dialogs */}
      <EditProductDialog
        open={!!editProduct}
        product={editProduct}
        onClose={() => setEditProduct(null)}
        onSave={handleUpdate}
      />

      <ConfirmDialog
        open={!!deleteProductId}
        title="Delete Product?"
        description="Are you sure you want to permanently delete this product? This action cannot be undone."
        onCancel={() => setDeleteProductId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ListingsTabs;
