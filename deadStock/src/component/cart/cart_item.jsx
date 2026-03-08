import { Card, Typography, Stack, IconButton, Box } from "@mui/material";
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

const CartDrawerItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const qty = toNumber(item.quantity);
  const unitPrice = getUnitPrice(item);
  const total = getItemTotal(item);
  const displayName = getDisplayName(item);
  const cartItemId = item.cartItemId || item.id;

  return (
    <Card
      sx={{
        mb: 2,
        p: 2.5,
        background: "rgba(245, 255, 250, 0.85)",
        color: "#1F2937",
        borderRadius: 3,
        border: "1px solid rgba(34,197,94,0.2)",
        backdropFilter: "blur(6px)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          background: "rgba(220, 252, 231, 0.95)",
          boxShadow: "0 10px 20px rgba(34,197,94,0.25)",
        },
      }}
    >
      {/* Name + Total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
          gap: 1,
        }}
      >
        <Typography
          fontWeight={700}
          sx={{
            flex: 1,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {displayName}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#22C55E",
            ml: 1,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            fontWeight: 700,
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          Rs.{formatPrice(total)}
        </Typography>
      </Box>

      {/* Bulk Order Badge */}
      {item.isBulkOrder && (
        <Typography
          variant="caption"
          sx={{
            color: "#10B981",
            fontStyle: "italic",
            display: "block",
            mb: 1,
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
          }}
        >
          ✓ Bulk order discount applied
        </Typography>
      )}

      {/* Price Breakdown */}
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "rgba(31,41,55,0.8)",
          fontSize: { xs: "0.8rem", sm: "0.9rem" },
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          flexWrap: "wrap",
        }}
      >
        <Box component="span">Rs.{formatPrice(unitPrice)}</Box>
        <Box component="span">×</Box>
        <Box component="span">{qty}</Box>
        <Box component="span">=</Box>
        <Box component="span" sx={{ fontWeight: 600, color: "#047857" }}>
          Rs.{formatPrice(total)}
        </Box>
      </Typography>

      {/* Quantity Controls + Delete */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Decrease — triggers releaseProductStock(1) in CartDrawer */}
          <IconButton
            size="small"
            onClick={() => onDecrease(cartItemId, qty)}
            sx={{
              color: "#047857",
              border: "1px solid rgba(4,120,87,0.2)",
              backgroundColor: "rgba(220,252,231,0.4)",
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              "&:hover": { backgroundColor: "rgba(16,185,129,0.25)" },
              "&:active": { transform: "scale(0.95)" },
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Typography
            sx={{
              minWidth: { xs: 25, sm: 30 },
              textAlign: "center",
              fontWeight: 600,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: "#065F46",
            }}
          >
            {qty}
          </Typography>

          {/* Increase — Redux only, no extra reserve needed */}
          <IconButton
            size="small"
            onClick={() => onIncrease(cartItemId, qty)}
            sx={{
              color: "#047857",
              border: "1px solid rgba(4,120,87,0.2)",
              backgroundColor: "rgba(220,252,231,0.4)",
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              "&:hover": { backgroundColor: "rgba(16,185,129,0.25)" },
              "&:active": { transform: "scale(0.95)" },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Remove — triggers releaseProductStock(fullQty) in CartDrawer */}
        <IconButton
          size="small"
          onClick={() => onRemove(cartItemId)}
          sx={{
            color: "#DC2626",
            backgroundColor: "rgba(248,113,113,0.1)",
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            "&:hover": { backgroundColor: "rgba(248,113,113,0.2)" },
            "&:active": { transform: "scale(0.95)" },
            ml: 2,
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default CartDrawerItem;