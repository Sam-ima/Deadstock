import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { formatPrice } from "./cart_utils";

const CartDrawerFooter = ({ cartTotal, onCheckout }) => {
  return (
    <Box sx={{ p: 3, backgroundColor: "rgba(25, 70, 56, 0.95)" }}>
      <Divider sx={{ mb: 2, borderColor: "#FFFFFF" }} />
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={800} color="#FFF">
          Total:
        </Typography>
        <Typography variant="h6" fontWeight={800} color="#FFF">
          Rs.{formatPrice(cartTotal)}
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        startIcon={<ShoppingCartCheckoutIcon />}
        sx={{
          backgroundColor: "#2a9d8f",
          fontWeight: 700,
          py: 1.5,
          "&:hover": { backgroundColor: "#21867a" },
        }}
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default CartDrawerFooter;
