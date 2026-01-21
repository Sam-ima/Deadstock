import {
  Card,
  Typography,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  formatPrice,
  getUnitPrice,
  getDisplayName,
  toNumber,
  getItemTotal,
} from "./cart_utils";

const CartDrawerItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const qty = toNumber(item.quantity);
  const unitPrice = getUnitPrice(item);
  const total = getItemTotal(item);
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
        <Typography fontWeight={700} sx={{ flex: 1 }}>
          {displayName}
        </Typography>
        <Typography variant="caption" sx={{ color: "#90BE6D", ml: 1 }}>
          Rs.{formatPrice(total)}
        </Typography>
      </Box>

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

      <Typography variant="body2" sx={{ mb: 2, color: "#CCCCCC" }}>
        Rs.{formatPrice(unitPrice)} × {qty} = Rs.{formatPrice(total)}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            size="small"
            sx={{ 
              color: "#FFFFFF", 
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.1)",
              '&:hover': {
                backgroundColor: "rgba(255,255,255,0.2)",
              }
            }}
            onClick={() => onDecrease(cartItemId, qty)}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Typography sx={{ minWidth: 30, textAlign: "center", fontWeight: 600 }}>
            {qty}
          </Typography>

          <IconButton
            size="small"
            sx={{ 
              color: "#FFFFFF", 
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.1)",
              '&:hover': {
                backgroundColor: "rgba(255,255,255,0.2)",
              }
            }}
            onClick={() => onIncrease(cartItemId, qty)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>

        <IconButton
          size="small"
          sx={{ 
            color: "#FF6B6B",
            backgroundColor: "rgba(255,107,107,0.1)",
            '&:hover': {
              backgroundColor: "rgba(255,107,107,0.2)",
            }
          }}
          onClick={() => onRemove(cartItemId)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default CartDrawerItem;
