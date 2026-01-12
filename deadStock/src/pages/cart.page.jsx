import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
  Badge,
  Chip,
  Card,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SecurityIcon from "@mui/icons-material/Security";

import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  updateItemQuantity,
  removeItem,
} from "../store/slice/cartSlice";

/* ----------------------------------------
   🔒 SAFE HELPERS (CRITICAL)
---------------------------------------- */

const toNumber = (v) => (typeof v === "number" && !isNaN(v) ? v : 0);
const formatPrice = (v) => toNumber(v).toFixed(2);

/* ----------------------------------------
   Component
---------------------------------------- */

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || {});

  const cartItemsArray = Object.values(cartItems);

  const totalItems = cartItemsArray.reduce(
    (sum, item) => sum + toNumber(item.quantity),
    0
  );

  const cartTotal = cartItemsArray.reduce(
    (sum, item) =>
      sum +
      toNumber(
        item.totalPrice ??
          toNumber(item.unitPrice) * toNumber(item.quantity)
      ),
    0
  );

  /* ----------------------------------------
     Handlers
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
        id: item.id,
        name: item.name,
        product: item.product,
        quantity: 1,
        unitPrice: toNumber(item.unitPrice),
        isBulkOrder: item.isBulkOrder,
      })
    );
  };

  /* ----------------------------------------
     Render
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
            width: 420,
            height: "calc(100vh - 64px)",
            background:
              "linear-gradient(135deg, #2E7D32 0%, #1B5E20 50%, #F57C00 100%)",
            zIndex: 1200,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER */}
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingBagIcon sx={{ fontSize: 32, color: "white" }} />
                </Badge>
                <Typography color="white" fontWeight={700}>
                  {totalItems} items • ${formatPrice(cartTotal)}
                </Typography>
              </Stack>
              <IconButton onClick={onClose} sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* ITEMS */}
          <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
            {cartItemsArray.map((item) => {
              const qty = toNumber(item.quantity);
              const price = toNumber(item.unitPrice);
              const total =
                item.totalPrice ?? toNumber(price * qty);

              return (
                <Card key={item.cartItemId} sx={{ mb: 2, p: 2 }}>
                  <Typography fontWeight={700}>
                    {item.product?.name || item.name}
                  </Typography>

                  <Typography>
                    ${formatPrice(price)} × {qty}
                  </Typography>

                  <Stack direction="row" justifyContent="space-between">
                    <IconButton
                      onClick={() =>
                        handleDecrease(item.cartItemId, qty)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography fontWeight={700}>
                      ${formatPrice(total)}
                    </Typography>

                    <IconButton onClick={() => handleIncrease(item)}>
                      <AddIcon />
                    </IconButton>
                  </Stack>

                  <IconButton
                    color="error"
                    onClick={() =>
                      dispatch(removeItem(item.cartItemId))
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              );
            })}
          </Box>

          {/* FOOTER */}
          {cartItemsArray.length > 0 && (
            <Box sx={{ p: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography fontWeight={800}>
                Total: ${formatPrice(cartTotal)}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
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
