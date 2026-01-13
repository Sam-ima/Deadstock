import { useState, useContext } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";
import { ShoppingCart, ShoppingBag, Business } from "@mui/icons-material";
import { CartContext } from "./cartContext";
import { useAuth } from "../../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/slice/cartSlice";
import { toast } from "react-toastify";

const ActionButtons = ({ product, quantity }) => {
  const cartCtx = useContext(CartContext);
  const { user, loading } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showSellerPrompt, setShowSellerPrompt] = useState(false);
  const [actionType, setActionType] = useState(null); // "add" or "buy"

  const isOutOfStock = product.stock === 0;
  const meetsMOQ = product.moq && quantity >= product.moq;

  /* ----------------------------------------
     1️⃣ LOGIN CHECK
     ✅ Only show dialog if user is not logged in
  ---------------------------------------- */
  const requireLogin = (action) => {
    if (loading) return true;

    if (!user) {
      setActionType(action);
      setShowSellerPrompt(true); // open dialog
      return true;
    }

    return false; // user logged in → skip dialog
  };

  /* ----------------------------------------
     2️⃣ PRICE LOGIC
  ---------------------------------------- */
  const getFinalPrice = () => {
    if (user?.role === "seller" && meetsMOQ && product.bulkPrice) {
      return product.bulkPrice;
    }
    return product.price;
  };

  /* ----------------------------------------
     3️⃣ CORE HANDLER
  ---------------------------------------- */
  const handleAction = (type) => {
    // If user is not logged in, show dialog
    if (requireLogin(type)) return;

    // Logged-in users → directly proceed
    proceed(type);
  };

  /* ----------------------------------------
     4️⃣ FINAL EXECUTION
     ✅ Updates Redux + CartContext
     ✅ Serializes Firestore Timestamp
  ---------------------------------------- */
const proceed = (type) => {
  const unitPrice = getFinalPrice();

  // Convert Firestore Timestamp to milliseconds
  const sanitizedProduct = {
    ...product,
    lastDepreciatedAt: product.lastDepreciatedAt
      ? product.lastDepreciatedAt.toMillis()
      : null,
  };

      const cartItem = {
    product: sanitizedProduct,
    quantity,
    unitPrice, // Make sure this is a number
    totalPrice: (unitPrice || 0) * quantity,
    isBulkOrder: user?.role === "seller" && meetsMOQ,
    // Add these fields for Redux compatibility
    id: product.id,
    name: product.name,
    price: product.price, // Original price
    cartItemId: `${product.id}_${unitPrice}_${Date.now()}`, // Unique ID
  };

  if (type === "add") {
    // Add to Redux
    dispatch(addItem(cartItem));

    // Add to CartContext for drawer update
    if (cartCtx?.addToCart) cartCtx.addToCart(cartItem);

    toast.success("Item added to cart 🛒", {
      position: "top-right",
      autoClose: 2000,
    });
  } else {
    // Direct purchase
    sessionStorage.setItem("directOrder", JSON.stringify([cartItem]));
    navigate("/checkout", {
      state: { isDirectPurchase: true, items: [cartItem] },
    });
  }
};

  /* ----------------------------------------
     5️⃣ DIALOG ACTIONS
  ---------------------------------------- */
  const continueAsBuyer = () => {
    setShowSellerPrompt(false);
    navigate("/login", {
      state: {
        redirectTo: window.location.pathname,
        intendedAction: actionType,
      },
    });
  };

  const registerAsSeller = () => {
    setShowSellerPrompt(false);
    navigate("/auth", {
      state: {
        productId: product.id,
        quantity,
        returnTo: window.location.pathname,
      },
    });
  };

  /* ----------------------------------------
     6️⃣ UI
  ---------------------------------------- */
  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCart />}
          onClick={() => handleAction("add")}
          disabled={isOutOfStock}
          sx={{
            flex: 1,
            backgroundColor: "#194638", // Set custom color for Add to Cart
            "&:hover": { backgroundColor: "#163c2e" }, // Hover effect
          }}
        >
          Add to Cart
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<ShoppingBag />}
          onClick={() => handleAction("buy")}
          disabled={isOutOfStock}
          sx={{
            flex: 1,
            borderColor: "#ED6C02", // Set custom color for Buy Now
            color: "#ED6C02", // Set custom color for Buy Now text
            "&:hover": {
              borderColor: "#d85a00", // Hover effect for border color
              backgroundColor: "#d85a00", // Hover effect for background
              color: "#FFFFFF", // Text color change on hover
            },
          }}
        >
          Buy Now
        </Button>
      </Stack>

      {/* Login Prompt Dialog */}
      <Dialog open={showSellerPrompt} onClose={() => setShowSellerPrompt(false)}>
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <Business color="primary" />
            <span>Login Required</span>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            You must be logged in to add items to your cart or make a purchase.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={continueAsBuyer}>Login</Button>
          <Button variant="contained" onClick={registerAsSeller}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButtons;
