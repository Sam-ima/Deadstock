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

const toNumber = (v) => (typeof v === "number" && !isNaN(v) ? v : 0);
const formatPrice = (v) => toNumber(v).toFixed(2);

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || {});
  const cartItemsArray = Object.values(cartItems);

  const totalItems = cartItemsArray.reduce((sum, item) => sum + toNumber(item.quantity), 0);
  const cartTotal = cartItemsArray.reduce(
    (sum, item) => sum + toNumber(item.totalPrice ?? (item.unitPrice ?? 0) * item.quantity),
    0
  );

  const handleDecrease = (cartItemId, qty) => {
    if (qty > 1) {
      dispatch(updateItemQuantity({ cartItemId, quantity: qty - 1 }));
    } else {
      dispatch(removeItem(cartItemId));
    }
  };

  const handleIncrease = (item) => {
    dispatch(addItem({
      ...item,
      quantity: 1,
      unitPrice: item.unitPrice ?? item.price ?? 0,
    }));
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 1199,
          }}
        />
      )}

      {/* Drawer */}
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: 64,
            right: 0,
            width: { xs: 350, sm: 420 },
            height: "calc(100vh - 64px)",
            backgroundColor: "#1a3b2d",
            zIndex: 1200,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            display: "flex",
            flexDirection: "column",
            color: "#FFFFFF",
            boxShadow: "-4px 0px 20px rgba(0,0,0,0.5)",
          }}
        >
          {/* HEADER */}
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingBagIcon sx={{ fontSize: 32, color: "#FFFFFF" }} />
                </Badge>
                <Typography fontWeight={700} sx={{ color: "#FFFFFF" }}>
                  {totalItems} items • ${formatPrice(cartTotal)}
                </Typography>
              </Stack>
              <IconButton onClick={onClose} sx={{ color: "#FFFFFF" }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* CART ITEMS */}
          <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
            {cartItemsArray.length === 0 ? (
              <Typography sx={{ mt: 5, textAlign: "center", color: "#FFFFFF" }}>
                Your cart is empty
              </Typography>
            ) : (
              cartItemsArray.map((item) => {
                const qty = toNumber(item.quantity);
                const price = toNumber(item.unitPrice ?? item.price ?? 0);
                const total = toNumber(item.totalPrice ?? price * qty);

                return (
                  <Card
                    key={item.cartItemId}
                    sx={{
                      mb: 2,
                      p: 2,
                      backgroundColor: "#194638",
                      color: "#FFFFFF",
                      borderRadius: 2,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <Typography fontWeight={700}>{item.product?.name || item.name}</Typography>
                    <Typography>${formatPrice(price)} × {qty}</Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                      <IconButton sx={{ color: "#FFFFFF" }} onClick={() => handleDecrease(item.cartItemId, qty)}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography fontWeight={700}>${formatPrice(total)}</Typography>

                      <IconButton sx={{ color: "#FFFFFF" }} onClick={() => handleIncrease(item)}>
                        <AddIcon />
                      </IconButton>
                    </Stack>

                    <IconButton onClick={() => dispatch(removeItem(item.cartItemId))} sx={{ mt: 1 }}>
                      <DeleteIcon sx={{ color: "#FF6B6B" }} />
                    </IconButton>
                  </Card>
                );
              })
            )}
          </Box>

          {/* FOOTER */}
          {cartItemsArray.length > 0 && (
            <Box sx={{ p: 3, backgroundColor: "rgba(25, 70, 56, 0.95)" }}>
              <Divider sx={{ mb: 2, borderColor: "#FFFFFF" }} />
              <Typography fontWeight={800} sx={{ mb: 2, color: "#FFFFFF" }}>
                Total: ${formatPrice(cartTotal)}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{
                  backgroundColor: "#2a9d8f",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  "&:hover": { backgroundColor: "#E0E0E0", color: "#000" },
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
