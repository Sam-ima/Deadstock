// CartDrawerItem.jsx
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
        p: 2.5,
        background: "rgba(245, 255, 250, 0.85)", // soft white-green
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
      {/* Product Name and Price */}
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
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
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
            color: "#22C55E", // greenish
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

      {/* Bulk Order Indicator */}
      {item.isBulkOrder && (
        <Typography
          variant="caption"
          sx={{
            color: "#10B981", // darker green
            fontStyle: "italic",
            display: "block",
            mb: 1,
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
            letterSpacing: 0.3,
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
          color: "rgba(31,41,55,0.8)", // soft gray-black
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

      {/* Quantity Controls and Remove Button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        {/* Quantity Controls */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flex: 1 }}
        >
          <IconButton
            size="small"
            sx={{
              color: "#047857",
              border: "1px solid rgba(4,120,87,0.2)",
              backgroundColor: "rgba(220,252,231,0.4)",
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(16,185,129,0.25)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
            onClick={() => onDecrease(cartItemId, qty)}
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

          <IconButton
            size="small"
            sx={{
              color: "#047857",
              border: "1px solid rgba(4,120,87,0.2)",
              backgroundColor: "rgba(220,252,231,0.4)",
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(16,185,129,0.25)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
            onClick={() => onIncrease(cartItemId, qty)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Remove Button */}
        <IconButton
          size="small"
          sx={{
            color: "#DC2626",
            backgroundColor: "rgba(248,113,113,0.1)",
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(248,113,113,0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
            ml: 2,
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