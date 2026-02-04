import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import ListingsGrid from "./listingGrid";
import EditProductDialog from "./editProductDialog/EditProductDialog";
import ConfirmDialog from "./confirmationDialog";
import { getProductsBySeller, deleteProduct, updateProduct } from "../../../services/productService";

const ListingsTabs = ({ user }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("selling");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Set default tab based on role
  useEffect(() => {
    if (!user) return;
    if (user.role === "seller" || user.role === "both") setTab("selling");
    else setTab("orders"); // buyer only
  }, [user]);

  // Fetch products or orders based on tab
  useEffect(() => {
    if (!user || !tab) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        if (tab === "selling") {
          const items = await getProductsBySeller(user.uid, "active");
          setProducts(items);
        } else if (tab === "orders") {
          const ordersQuery = query(collection(db, "orders"), where("userId", "==", user.uid));
          const snap = await getDocs(ordersQuery);
          setOrders(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab, user]);

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

  const handleToggleBidding = async (productId, isDepreciating) => {
    try {
      const saleType = !isDepreciating ? "auction" : "direct";
      await updateProduct(productId, { isDepreciating, saleType });
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, isDepreciating, saleType } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Configure tabs dynamically
  const tabs = [
    { value: "selling", label: "🟢 Selling" },
  ];

  if (user.role === "both" || user.role === "buyer") {
    tabs.push({ value: "orders", label: user.role === "buyer" ? "🟡 My Orders" : "🟡 Orders as Buyer" });
  }

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
          {tabs.map((t) => (
            <ToggleButton key={t.value} value={t.value}>
              {t.label}
            </ToggleButton>
          ))}

          {/* Add Product button for seller or both */}
          {(user.role === "seller" || user.role === "both") && (
            <ToggleButton
              value="add"
              onClick={() => navigate("/how-to-sell")}
              sx={{
                color: "#333",
                fontWeight: 600,
                "&:hover": { bgcolor: "#e0f2f1" },
              }}
            >
              ➕ Add Product
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </Box>

      {/* Tab Content */}
      <Box mt={4}>
        {loading && <Typography textAlign="center">Loading...</Typography>}

        {/* Selling products */}
        {!loading && tab === "selling" && products.length === 0 && (
          <Typography textAlign="center">No products found.</Typography>
        )}
        {!loading && tab === "selling" && products.length > 0 && (
          <ListingsGrid
            products={products}
            onEdit={setEditProduct}
            onDelete={setDeleteProductId}
            onToggleBidding={handleToggleBidding}
          />
        )}

        {/* Orders */}
        {!loading && (tab === "orders") && orders.length === 0 && (
          <Typography textAlign="center">No orders found.</Typography>
        )}
        {!loading && (tab === "orders") && orders.length > 0 && (
          <Box>
            {orders.map((order) => (
              <Box
                key={order.id}
                p={2}
                mb={2}
                border="1px solid #ddd"
                borderRadius={2}
                bgcolor="#fafafa"
              >
                <Typography fontWeight={600}>
                  Order ID: {order.transactionUuid || order.id}
                </Typography>
                <Typography variant="body2">
                  Payment: {order.paymentMethod} - {order.paymentStatus}
                </Typography>
                <Typography variant="body2">Total: ${order.totalAmount}</Typography>
                <Typography variant="body2" mt={1}>
                  Items:
                </Typography>
                <Box ml={2}>
                  {order.items.map((item, i) => (
                    <Typography key={i} variant="body2">
                      {item.quantity} x {item.name} (${item.price})
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
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
