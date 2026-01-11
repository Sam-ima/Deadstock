import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getProductsBySeller,
  deleteProduct,
  updateProduct,
} from "../../../services/productService";
import { useNavigate } from "react-router-dom";
import ListingsGrid from "./listingGrid";
// import ListingsMobileSlider from "./ListingsMobileSlider";
import EditProductDialog from "./editProductDialog";
import ConfirmDialog from "./confirmationDialog";


const ListingsTabs = ({ sellerId }) => {
  // const isMobile = useMediaQuery("(max-width:600px)");
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

  return (
    <>
      {/* Tabs */}
      <Box mt={4} display="flex" justifyContent="center">
        <ToggleButtonGroup
          value={tab}
          exclusive
          onChange={(_, v) => v && setTab(v)}
        >
          <ToggleButton value="selling">Selling</ToggleButton>
          <ToggleButton value="sold">Sold</ToggleButton>
          <ToggleButton value="add" onClick={()=>navigate("/sell-item")}>Add</ToggleButton>
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
          <ListingsGrid products={products} />
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
        description="This action cannot be undone."
        onCancel={() => setDeleteProductId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ListingsTabs;
