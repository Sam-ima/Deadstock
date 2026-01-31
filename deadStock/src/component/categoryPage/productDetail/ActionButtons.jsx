import { useState, useContext } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { ShoppingCart, ShoppingBag, Business } from "@mui/icons-material";
import { CartContext } from "./CartContext";
import { useAuth } from "../../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/slice/cartSlice";
import { setDirectPurchaseItem } from "../../../store/slice/purchaseSlice";
import { toast } from "react-toastify";
import { reserveProductStock } from "../../cart/cart_utils";

const ActionButtons = ({ product, quantity }) => {
  const cartCtx = useContext(CartContext);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showSellerPrompt, setShowSellerPrompt] = useState(false);
  const [actionType, setActionType] = useState(null); // "add" or "buy"
  const [loadingStock, setLoadingStock] = useState(false); // disable buttons while reserving

  const isOutOfStock =
    product.availableStock === 0 || quantity > product.availableStock;

  /* ----------------------------------------
     1️⃣ LOGIN CHECK
  ---------------------------------------- */
  const requireLogin = (action) => {
    if (loading) return true;

    if (!user) {
      setActionType(action);
      setShowSellerPrompt(true);
      return true;
    }

    return false;
  };

  /* ----------------------------------------
     2️⃣ PRICE LOGIC
  ---------------------------------------- */
  const getFinalPrice = () => {
    if (
      user?.role === "seller" &&
      product.bulkPrice &&
      quantity >= product.moq
    ) {
      return product.bulkPrice;
    }
    return product.price;
  };

  /* ----------------------------------------
     3️⃣ CORE HANDLER
  ---------------------------------------- */
  const handleAction = async (type) => {
    if (!user) {
      setActionType(type);
      setShowSellerPrompt(true);
      return;
    }

    // Reserve stock on backend before adding
    await reserveStockAndProceed(type);
  };

  /* ----------------------------------------
     4️⃣ RESERVE STOCK + PROCEED
  ---------------------------------------- */
  const reserveStockAndProceed = async (type) => {
    if (loadingStock) return;
    setLoadingStock(true);

    try {
      // Call backend to reserve stock (atomic)
      await reserveProductStock(product.id, quantity);
      console.log("Reserving stock:", { product, quantity: quantity });
      // Backend succeeded → proceed locally
      const unitPrice = getFinalPrice();

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
        totalPrice: unitPrice * quantity,
        isBulkOrder: user?.role === "seller" && quantity >= product.moq,
        id: product.id,
        name: product.name,
        price: product.price,
        cartItemId: `${product.id}_${unitPrice}_${Date.now()}`,
      };

      if (type === "add") {
        dispatch(addItem(cartItem));
        cartCtx?.addToCart?.(cartItem);

        toast.success("Item added to cart 🛒", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        dispatch(setDirectPurchaseItem(cartItem));
        navigate("/checkout", {
          state: { isDirectPurchase: true, items: [cartItem] },
        });
        toast.info("Proceeding to checkout...", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (err) {
      console.error("❌ Stock reservation failed:", err.message);
      toast.error(err.message || "Unable to reserve stock");
    } finally {
      setLoadingStock(false);
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
          disabled={isOutOfStock || loadingStock}
          sx={{
            flex: 1,
            backgroundColor: "#194638",
            "&:hover": { backgroundColor: "#163c2e" },
          }}
        >
          {loadingStock ? "Reserving..." : "Add to Cart"}
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<ShoppingBag />}
          onClick={() => handleAction("buy")}
          disabled={isOutOfStock || loadingStock}
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
          {loadingStock ? "Reserving..." : "Buy Now"}
        </Button>
      </Stack>

      <Dialog
        open={showSellerPrompt}
        onClose={() => setShowSellerPrompt(false)}
      >
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
