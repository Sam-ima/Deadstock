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
import { CartContext } from "./CartContext";
import { useAuth } from "../../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/slice/cartSlice";
import { setDirectPurchaseItem } from "../../../store/slice/purchaseSlice";
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
    // If user is not logged in, show login dialog
    if (!user) {
      setActionType(type);
      setShowSellerPrompt(true);
      return;
    }

    // Logged-in users → directly proceed
    proceed(type);
  };

  /* ----------------------------------------
     4️⃣ FINAL EXECUTION - ONLY FOR LOGGED-IN USERS
  ---------------------------------------- */
  const proceed = (type) => {
    // Double-check user is logged in
    if (!user) {
      toast.error("Please login to continue");
      return;
    }

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
      unitPrice,
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
      // sessionStorage.setItem("directOrder", JSON.stringify([cartItem]));
       dispatch(setDirectPurchaseItem(cartItem));
      navigate("/checkout", {
        state: { isDirectPurchase: true, items: [cartItem] },
      });
      toast.info("Proceeding to checkout...", {
        position: "top-right",
        autoClose: 1500,
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
    navigate("/login", {
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
            backgroundColor: "#194638",
            "&:hover": { backgroundColor: "#163c2e" },
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
            borderColor: "#ED6C02",
            color: "#ED6C02",
            "&:hover": {
              borderColor: "#d85a00",
              backgroundColor: "#d85a00",
              color: "#FFFFFF",
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
            {actionType === "add" 
              ? "You need to be logged in to add items to your cart." 
              : "You need to be logged in to make a purchase."}
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