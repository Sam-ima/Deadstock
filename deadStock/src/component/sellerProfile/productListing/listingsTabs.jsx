import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import ListingsGrid from "./ProductSellAndBuyListing/listingGrid";
import EditProductDialog from "./editProductDialog/EditProductDialog";
import ConfirmDialog from "./confirmationDialog";
import {
  getProductsBySeller,
  deleteProduct,
  updateProduct,
} from "../../../services/productService";

import { toggleBidding } from "../../../services/productService";

const ListingsTabs = ({ user }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Set default tab based on role
  useEffect(() => {
    if (!user) return;
    if (user.role === "both")
      setTab("selling"); // default for both
    else if (user.role === "seller") setTab("selling");
    else if (user.role === "buyer") setTab("orders");
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
          const ordersQuery = query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
          );
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
    setProducts((prev) => prev.filter((p) => p.id !== deleteProductId));
    setDeleteProductId(null);
  };

  const handleUpdate = async (data) => {
    await updateProduct(data.id, data);
    setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    setEditProduct(null);
  };
  const handleAuctionUpdate = async (productId, updates) => {
    await updateProduct(productId, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p)),
    );
  };
  const handleToggleBidding = async (product, auctionConfig) => {
    try {
      await toggleBidding(product, auctionConfig);

      // Refresh seller products
      const items = await getProductsBySeller(user.uid, "active");
      setProducts(items);
    } catch (err) {
      console.error("Bidding toggle failed:", err);
    }
  };

  // Configure tabs dynamically
  const tabs = [];
  if (user.role === "seller" || user.role === "both") {
    tabs.push({ value: "selling", label: "🟢 Selling" });
  }
  if (user.role === "buyer" || user.role === "both") {
    tabs.push({
      value: "orders",
      label: user.role === "buyer" ? "🟡 My Orders" : "🟡 Orders as Buyer",
    });
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

        {tab === "selling" && (
          <>
            {products.length === 0 ? (
              <Typography textAlign="center">No products found.</Typography>
            ) : (
              <ListingsGrid
                items={products}
                onEdit={setEditProduct}
                onDelete={setDeleteProductId}
                onToggleBidding={handleToggleBidding}
                onAuctionUpdate={handleAuctionUpdate}
                mode="products"
              />
            )}
          </>
        )}

        {tab === "orders" && (
          <>
            {orders.length === 0 ? (
              <Typography textAlign="center">No orders found.</Typography>
            ) : (
              <ListingsGrid items={orders} mode="orders" />
            )}
          </>
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
