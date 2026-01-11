// src/components/cart/CartDrawer.jsx
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { addItem, decreaseItem, removeItem } from "../store/slice/cartSlice";

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const cartItems = Object.values(items);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.unitPrice * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, p: 3 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Shopping Cart
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" mt={5}>
            Your cart is empty 🛒
          </Typography>
        ) : (
          cartItems.map(({ product, quantity }) => (
            <Box
              key={product.id}
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  src={product.image}
                  variant="rounded"
                  sx={{ width: 60, height: 60 }}
                />

                <Box flex={1}>
                  <Typography fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.unitPrice}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(decreaseItem(product.id))}
                    >
                      −
                    </Button>
                    <Typography mt={0.5}>{quantity}</Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(addItem(product))}
                    >
                      +
                    </Button>
                  </Stack>
                </Box>

                <IconButton
                  color="error"
                  onClick={() => dispatch(removeItem(product.id))}
                >
                  ✕
                </IconButton>
              </Stack>
            </Box>
          ))
        )}

        {/* Footer */}
        {cartItems.length > 0 && (
          <Box mt={3}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6">
              Total: ${cartTotal.toFixed(2)}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.2 }}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
