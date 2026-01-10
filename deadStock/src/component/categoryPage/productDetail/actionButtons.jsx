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
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({ product, quantity }) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const addToCart = cartCtx?.addToCart;
  const user = authCtx?.user;

  const navigate = useNavigate();

  const [showSellerPrompt, setShowSellerPrompt] = useState(false);
  const [actionType, setActionType] = useState(null); // add | buy

  const isOutOfStock = product.stock === 0;
  const meetsMOQ = product.moq && quantity >= product.moq;

  /* ----------------------------------------
     1️⃣ LOGIN CHECK (HARD RULE)
  ---------------------------------------- */
  const requireLogin = (action) => {
    if (!user) {
      navigate("/auth", {
        state: {
          redirectTo: window.location.pathname,
          intendedAction: action
        }
      });
      return true;
    }
    return false;
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
    if (requireLogin(type)) return;

    // Seller cannot buy in bulk
    if (user.role === "seller" && meetsMOQ) {
      alert("Sellers cannot purchase bulk items.");
      return;
    }

    // Buyer meets MOQ → ask seller registration
    if (user.role === "buyer" && meetsMOQ) {
      setActionType(type);
      setShowSellerPrompt(true);
      return;
    }

    proceed(type);
  };

  /* ----------------------------------------
     4️⃣ FINAL EXECUTION
  ---------------------------------------- */
  const proceed = (type) => {
    const unitPrice = getFinalPrice();

    const item = {
      ...product,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
      isBulkOrder: user?.role === "seller" && meetsMOQ,
      moq: product.moq
    };

    if (type === "add") {
      addToCart(item);
    } else {
      sessionStorage.setItem("directOrder", JSON.stringify([item]));
      navigate("/checkout", {
        state: { isDirectPurchase: true, items: [item] }
      });
    }
  };

  /* ----------------------------------------
     5️⃣ DIALOG ACTIONS
  ---------------------------------------- */
  const continueAsBuyer = () => {
    setShowSellerPrompt(false);
    proceed(actionType);
  };

  const registerAsSeller = () => {
    setShowSellerPrompt(false);
    navigate("/auth", {
      state: {
        productId: product.id,
        quantity,
        returnTo: window.location.pathname
      }
    });
  };

  /* ----------------------------------------
     UI
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
          sx={{ flex: 1 }}
        >
          Add to Cart
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<ShoppingBag />}
          onClick={() => handleAction("buy")}
          disabled={isOutOfStock}
          sx={{ flex: 1 }}
        >
          Buy Now
        </Button>
      </Stack>

      {/* Seller Upgrade Prompt */}
      <Dialog open={showSellerPrompt} onClose={() => setShowSellerPrompt(false)}>
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <Business color="primary" />
            <span>Bulk Purchase Detected</span>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            You are purchasing <strong>{quantity}</strong> units, which meets the
            Minimum Order Quantity (MOQ) of <strong>{product.moq}</strong>.
          </DialogContentText>

          <DialogContentText sx={{ mt: 2 }}>
            Registering as a <strong>Seller</strong> allows you to access bulk pricing
            of <strong>${product.bulkPrice}/unit</strong>.
          </DialogContentText>

          <DialogContentText sx={{ mt: 2 }} color="text.secondary">
            You may continue as a buyer, but bulk discounts will not apply.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={continueAsBuyer}>
            Continue as Buyer (${product.price}/unit)
          </Button>
          <Button variant="contained" onClick={registerAsSeller}>
            Register as Seller
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButtons;
