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
    <Box
      sx={{
        p: { xs: 2.5, sm: 3 },
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Badge badgeContent={totalItems} color="warning">
            <ShoppingBagIcon
              sx={{
                fontSize: 32,
                color: "#16A34A", // green
              }}
            />
          </Badge>

          <Typography
            fontWeight={700}
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: "#111827",
            }}
          >
            {user
              ? `${totalItems} ${totalItems === 1 ? 'item' : 'items'} • Rs.${formatPrice(cartTotal)}`
              : "Please Login"}
          </Typography>
        </Stack>

        <IconButton
          onClick={onClose}
          sx={{
            color: "#EF4444",
            '&:hover': { backgroundColor: '#FEE2E2' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default CartDrawerHeader;