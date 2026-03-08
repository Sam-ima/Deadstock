import { Box, Slide, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateItemQuantity, removeItem } from "../store/slice/cartSlice";
import { useAuth } from "../context/authContext/authContext";
import CartDrawerHeader from "../component/cart/cartHeader";
import CartDrawerItem from "../component/cart/cart_item";
import CartDrawerFooter from "../component/cart/cart_footer";
import CartDrawerEmpty from "../component/cart/cart_drawer_empty";
import {
  toNumber,
  getItemTotal,
  releaseProductStock,
} from "../component/cart/cart_utils";
import { usePaymentStatus } from "../component/checkout/hooks/usePaymentStatus";

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { paymentStatus } = usePaymentStatus();

  const cartItems = useSelector((state) =>
    user ? state.cart.items || {} : {},
  );

  const cartItemsArray = Object.values(cartItems);

  const totalItems = cartItemsArray.reduce(
    (sum, item) => sum + toNumber(item.quantity),
    0,
  );

  const cartTotal = cartItemsArray.reduce(
    (sum, item) => sum + getItemTotal(item),
    0,
  );

  // ✅ Payment success: just clear Redux — DO NOT call releaseProductStock
  // because finalizeStock on the backend already handled stock deduction
  useEffect(() => {
    if (paymentStatus === "success" && cartItemsArray.length > 0) {
      cartItemsArray.forEach((item) => {
        dispatch(removeItem(item.cartItemId || item.id));
      });
    }
  }, [paymentStatus]); // intentionally exclude cartItemsArray to avoid loop

  // ✅ User manually removes item — release reserved stock back
  const handleRemoveItem = async (item) => {
    const productId = item.product?.id || item.id;
    const quantity = toNumber(item.quantity);

    try {
      await releaseProductStock(productId, quantity);
    } catch (err) {
      console.error("Failed to release stock on remove:", err.message);
      // Still remove from cart UI even if API fails
    }

    dispatch(removeItem(item.cartItemId || item.id));
  };

  // ✅ User decreases quantity — release 1 unit back, or remove entirely
  const handleDecreaseItem = async (item) => {
    const qty = toNumber(item.quantity);
    const productId = item.product?.id || item.id;

    try {
      await releaseProductStock(productId, 1); // always release 1 unit
    } catch (err) {
      console.error("Failed to release stock on decrease:", err.message);
    }

    if (qty > 1) {
      dispatch(
        updateItemQuantity({
          cartItemId: item.cartItemId || item.id,
          quantity: qty - 1,
        }),
      );
    } else {
      // qty was 1, now 0 — remove entirely
      dispatch(removeItem(item.cartItemId || item.id));
    }
  };

  return (
    <>
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1199,
          }}
        />
      )}

      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: { xs: 56, sm: 64 },
            right: 0,
            width: { xs: "85vw", sm: 450, md: 500 },
            height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
            backgroundColor: "#FFFFFF",
            zIndex: 1200,
            borderTopLeftRadius: { xs: 18, sm: 24 },
            borderBottomLeftRadius: { xs: 18, sm: 24 },
            display: "flex",
            flexDirection: "column",
            color: "#111827",
            boxShadow: "-8px 0 30px rgba(0,0,0,0.15)",
          }}
        >
          <CartDrawerHeader
            user={user}
            totalItems={totalItems}
            cartTotal={cartTotal}
            onClose={onClose}
          />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 2 },
              backgroundColor: "#F9FAFB",
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#D1D5DB",
                borderRadius: "4px",
              },
            }}
          >
            {!user ? (
              <CartDrawerEmpty onClose={onClose} />
            ) : cartItemsArray.length === 0 ? (
              <Box sx={{ textAlign: "center", mt: 4, px: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add some products to get started!
                </Typography>
              </Box>
            ) : (
              cartItemsArray.map((item) => (
                <CartDrawerItem
                  key={item.cartItemId || item.id}
                  item={item}
                  onIncrease={(id, q) =>
                    // ✅ No reserve call needed — stock already reserved at "Add to Cart"
                    dispatch(updateItemQuantity({ cartItemId: id, quantity: q + 1 }))
                  }
                  onDecrease={() => handleDecreaseItem(item)}
                  onRemove={() => handleRemoveItem(item)}
                />
              ))
            )}
          </Box>

          {user && cartItemsArray.length > 0 && (
            <CartDrawerFooter cartTotal={cartTotal} onCheckout={onClose} />
          )}
        </Box>
      </Slide>
    </>
  );
};

export default CartDrawer;