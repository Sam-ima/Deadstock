import {
  Box,
  Typography,
  IconButton,
  Stack,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { formatPrice } from "./cart_utils";

const CartDrawerHeader = ({ user, totalItems, cartTotal, onClose }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingBagIcon sx={{ fontSize: 32, color: "#FFFFFF" }} />
          </Badge>
          <Typography fontWeight={700} sx={{ color: "#FFFFFF" }}>
            {user
              ? `${totalItems} ${totalItems === 1 ? 'item' : 'items'} • Rs.${formatPrice(cartTotal)}`
              : "Please Login"}
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: "#FFFFFF" }}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default CartDrawerHeader;