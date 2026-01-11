import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import { getProductsBySeller, deleteProduct, updateProduct } from "../../services/productService";

const ListingsTabs = ({ sellerId }) => {
  const [tab, setTab] = useState("selling");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", currentPrice: "", basePrice: "", stock: "" });

  useEffect(() => {
    if (!sellerId || tab === "add") return;

    setProducts([]);
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const status = tab === "selling" ? "active" : "sold";
        const data = await getProductsBySeller(sellerId, status);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId, tab]);

  // Delete handler
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  // Open edit dialog
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name || "",
      currentPrice: product.currentPrice || "",
      basePrice: product.basePrice || "",
      stock: product.stock || "",
    });
    setEditOpen(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update product
  const handleUpdate = async () => {
    try {
      const updated = { ...currentProduct, ...formData };
      await updateProduct(currentProduct.id, updated);
      // Update UI
      setProducts((prev) =>
        prev.map((p) => (p.id === currentProduct.id ? updated : p))
      );
      setEditOpen(false);
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

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
          <ToggleButton value="add" onClick={() => alert("Open Add Product form")}>
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
        {loading && <Typography textAlign="center">Loading products...</Typography>}

        {!loading && products.length === 0 && (
          <Typography textAlign="center">No products found.</Typography>
        )}

        {products.map((item) => (
          <ListingCard
            key={item.id}
            product={item}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item)}
          />
        ))}
      </Box>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Current Price"
              name="currentPrice"
              type="number"
              value={formData.currentPrice}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Base Price"
              name="basePrice"
              type="number"
              value={formData.basePrice}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListingsTabs;
