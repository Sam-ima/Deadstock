import { Box, Typography, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { updateItemQuantity, removeItem } from "../../store/slice/cartSlice";
import {
  updateDirectPurchaseQuantity,
  removeDirectPurchaseItem,
} from "../../store/slice/purchaseSlice";
import { colors } from "./Constants";
import {
  toNumber,
  isSubMoq,
  getItemTotal,
  formatPrice,
  SUB_MOQ_SURCHARGE_RATE,
} from "../cart/cart_utils"; 

const OrderItem = ({ item }) => {
  const dispatch = useDispatch();

  const itemName    = item.name || "Product";
  const quantity    = toNumber(item.quantity) || 1;
  const isBulk      = item.isBulkOrder || false;
  const cartItemId  = item.cartItemId || item.id;
  const moq         = toNumber(item.moq ?? item.product?.moq ?? 0);

  // ── MOQ-aware pricing ──────────────────────────────────────────────────────
  // Raw base price (before any surcharge)
  const baseUnitPrice = toNumber(
    item.unitPrice ||
      item.product?.currentPrice ||
      item.product?.price ||
      0
  );

  // getItemTotal from cart_utils already calls applyMoqPricing internally,
  // so the line total is always correct whether or not qty < moq.
  const lineTotal      = getItemTotal(item);           // MOQ-aware total
  const effectiveUnit  = quantity > 0 ? lineTotal / quantity : baseUnitPrice;
  const belowMoq       = isSubMoq(item);
  const surchargePerUnit = belowMoq
    ? effectiveUnit - baseUnitPrice
    : 0;
  // ──────────────────────────────────────────────────────────────────────────

  const handleIncrease = () => {
    if (item.isDirectPurchase) {
      dispatch(updateDirectPurchaseQuantity({ quantity: quantity + 1 }));
    } else {
      dispatch(updateItemQuantity({ cartItemId, quantity: quantity + 1 }));
    }
  };

  const handleDecrease = () => {
    if (item.isDirectPurchase) {
      if (quantity > 1) {
        dispatch(updateDirectPurchaseQuantity({ quantity: quantity - 1 }));
      } else {
        dispatch(removeDirectPurchaseItem());
      }
    } else {
      if (quantity > 1) {
        dispatch(updateItemQuantity({ cartItemId, quantity: quantity - 1 }));
      } else {
        dispatch(removeItem(cartItemId));
      }
    }
  };

  const handleRemove = () => {
    if (item.isDirectPurchase) {
      dispatch(removeDirectPurchaseItem());
    } else {
      dispatch(removeItem(cartItemId));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        p: 2,
        bgcolor: colors.paperLight,
        borderRadius: 3,
        border: `1px solid ${belowMoq ? "#F59E0B" : colors.border}`,
        // Highlight the card amber when a surcharge is active so it's obvious
        boxShadow: belowMoq ? "0 0 0 1px rgba(245,158,11,0.3)" : "none",
        transition: "border 0.2s ease",
      }}
    >
      {/* Details */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Name + Line total */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            fontWeight={600}
            sx={{
              fontSize: "0.95rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {itemName}
          </Typography>

          {/* Line total uses MOQ-aware value */}
          <Typography fontWeight={600} color={colors.primary}>
            Rs. {formatPrice(lineTotal)}
          </Typography>
        </Box>

        {/* Unit price row */}
        <Typography
          variant="body2"
          color={colors.textSecondary}
          sx={{ mt: 0.5 }}
        >
          {isBulk ? "Bulk Order • " : ""}
          Unit Price: Rs.{" "}
          {belowMoq ? (
            <>
              {/* Strike-through the original price, show surcharged price */}
              <Box
                component="span"
                sx={{
                  textDecoration: "line-through",
                  color: colors.textSecondary,
                  mr: 0.5,
                }}
              >
                {formatPrice(baseUnitPrice)}
              </Box>
              <Box
                component="span"
                sx={{ color: "#D97706", fontWeight: 600 }}
              >
                {formatPrice(effectiveUnit)}
              </Box>
            </>
          ) : (
            formatPrice(effectiveUnit)
          )}
        </Typography>

        {/* Sub-MOQ surcharge notice */}
        {belowMoq && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              color: "#D97706",        // amber to match the card border
              lineHeight: 1.4,
            }}
          >
            ⚠ Below MOQ ({moq} units) — {SUB_MOQ_SURCHARGE_RATE * 100}%
            small-order fee of Rs.{formatPrice(surchargePerUnit)} per unit
            applied. Order {moq}+ units to remove this fee.
          </Typography>
        )}

        {/* Quantity Controls */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <IconButton size="small" onClick={handleDecrease}>
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Typography fontWeight={600}>{quantity}</Typography>

          <IconButton size="small" onClick={handleIncrease}>
            <AddIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            sx={{ ml: 1 }}
            onClick={handleRemove}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Bulk discount badge */}
        {isBulk && (
          <Typography
            variant="caption"
            color={colors.success}
            sx={{ display: "block", mt: 0.5 }}
          >
            ✓ Bulk discount applied
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default OrderItem;