import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
  Badge,
  Card,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useSelector, useDispatch } from "react-redux";
import { addItem, updateItemQuantity, removeItem } from "../store/slice/cartSlice";

/* ----------------------------------------
   SAFE HELPERS
---------------------------------------- */
const toNumber = (v) => (typeof v === "number" && !isNaN(v) ? v : 0);
const formatPrice = (v) => toNumber(v).toFixed(2);

/* ----------------------------------------
   COMPONENT
---------------------------------------- */
const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || {});

  // Convert object to array
  const cartItemsArray = Object.values(cartItems);

  const totalItems = cartItemsArray.reduce((sum, item) => sum + toNumber(item.quantity), 0);
  const cartTotal = cartItemsArray.reduce(
    (sum, item) => sum + toNumber(item.totalPrice ?? item.unitPrice * item.quantity),
    0
  );

  /* ----------------------------------------
     HANDLERS
  ---------------------------------------- */
  const handleDecrease = (cartItemId, qty) => {
    if (qty > 1) {
      dispatch(updateItemQuantity({ cartItemId, quantity: qty - 1 }));
    } else {
      dispatch(removeItem(cartItemId));
    }
  };

  const handleIncrease = (item) => {
    dispatch(
      addItem({
        ...item,
        quantity: 1,
      })
    );
  };

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */
  return (
    <>
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1199,
          }}
        />
      )}

      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: 64,
            right: 0,
            width: { xs: 350, sm: 420 },
            height: "calc(100vh - 64px)",
            backgroundColor: "#1E1E2F",
            zIndex: 1200,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            boxShadow: "-4px 0px 20px rgba(0,0,0,0.5)",
          }}
        >
          {/* HEADER */}
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingBagIcon sx={{ fontSize: 32, color: "#FFD600" }} />
                </Badge>
                <Typography fontWeight={700}>
                  {totalItems} items • ${formatPrice(cartTotal)}
                </Typography>
              </Stack>
              <IconButton onClick={onClose} sx={{ color: "#FFD600" }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* CART ITEMS */}
          <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
            {cartItemsArray.length === 0 ? (
              <Typography sx={{ mt: 5, textAlign: "center", color: "#bbb" }}>
                Your cart is empty
              </Typography>
            ) : (
              cartItemsArray.map((item) => {
                const qty = toNumber(item.quantity);
                const price = toNumber(item.unitPrice);
                const total = toNumber(item.totalPrice ?? price * qty);

                return (
                  <Card
                    key={item.cartItemId}
                    sx={{
                      mb: 2,
                      p: 2,
                      backgroundColor: "#2E2E3F",
                      color: "#fff",
                      borderRadius: 2,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <Typography fontWeight={700}>{item.product?.name || item.name}</Typography>
                    <Typography sx={{ color: "#FFD600" }}>
                      ${formatPrice(price)} × {qty}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                      <IconButton
                        sx={{ color: "#FFD600" }}
                        onClick={() => handleDecrease(item.cartItemId, qty)}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Typography fontWeight={700} sx={{ color: "#FFD600" }}>
                        ${formatPrice(total)}
                      </Typography>

                      <IconButton sx={{ color: "#FFD600" }} onClick={() => handleIncrease(item)}>
                        <AddIcon />
                      </IconButton>
                    </Stack>

                    <IconButton
                      color="error"
                      onClick={() => dispatch(removeItem(item.cartItemId))}
                      sx={{ mt: 1 }}
                    >
                      <DeleteIcon sx={{ color: "#FF5555" }} />
                    </IconButton>
                  </Card>
                );
              })
            )}
          </Box>

          {/* FOOTER */}
          {cartItemsArray.length > 0 && (
            <Box sx={{ p: 3, backgroundColor: "#2E2E3F" }}>
              <Divider sx={{ mb: 2, borderColor: "#555" }} />
              <Typography fontWeight={800} sx={{ mb: 2, color: "#FFD600" }}>
                Total: ${formatPrice(cartTotal)}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{
                  backgroundColor: "#FFD600",
                  color: "#000",
                  fontWeight: 700,
                  "&:hover": { backgroundColor: "#FFC400" },
                }}
              >
                Checkout
              </Button>
            </Box>
          )}
        </Box>
      </Slide>
    </>
  );
};

export default CartDrawer;
