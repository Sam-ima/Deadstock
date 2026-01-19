import {
  Card,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  formatPrice,
  getUnitPrice,
  getDisplayName,
  toNumber,
} from "./cart_utils";

const CartDrawerItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const qty = toNumber(item.quantity);
  const unitPrice = getUnitPrice(item);
  const total = toNumber(item.totalPrice || unitPrice * qty);
  const displayName = getDisplayName(item);
  const cartItemId = item.cartItemId || item.id;

  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: "#194638ff",
        color: "#FFFFFF",
        borderRadius: 2,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <Typography fontWeight={700} sx={{ mb: 1 }}>
        {displayName}
      </Typography>

      {item.isBulkOrder && (
        <Typography
          variant="caption"
          sx={{
            color: "#90EE90",
            fontStyle: "italic",
            display: "block",
            mb: 1,
          }}
        >
          ✓ Bulk order discount applied
        </Typography>
      )}

      <Typography sx={{ mb: 2 }}>
        Price: Rs.{formatPrice(unitPrice)} × {qty} = Rs.
        {formatPrice(total)}
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            sx={{ color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)" }}
            onClick={() => onDecrease(cartItemId, qty)}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Typography sx={{ minWidth: 30, textAlign: "center" }}>
            {qty}
          </Typography>

          <IconButton
            size="small"
            sx={{ color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)" }}
            onClick={() => onIncrease(cartItemId, qty)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>

        <IconButton
          size="small"
          sx={{ color: "#FF6B6B" }}
          onClick={() => onRemove(cartItemId)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default CartDrawerItem;
