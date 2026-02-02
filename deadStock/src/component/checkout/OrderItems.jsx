import { Box, Typography, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateItemQuantity, removeItem } from "../../store/slice/cartSlice";
import {
  updateDirectPurchaseQuantity,
  removeDirectPurchaseItem,
} from "../../store/slice/purchaseSlice";
import { colors } from "./Constants";

const OrderItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDirectPurchase = location.state?.isDirectPurchase;
  const itemName = item.name || "Product";
  const itemImage = item.product?.images?.[0] || item.image;
  const unitPrice = item.unitPrice || 0;
  const quantity = item.quantity || 1;
  const isBulk = item.isBulkOrder || false;

  const cartItemId = item.cartItemId || item.id;

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
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: 2,
          bgcolor: colors.primaryLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {itemImage ? (
          <Box
            component="img"
            src={itemImage}
            alt={itemName}
            loading="lazy"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          "📦"
        )}
      </Box>

      {/* Details */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
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

          <Typography fontWeight={600} color={colors.primary}>
            Rs. {(unitPrice * quantity).toFixed(2)}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color={colors.textSecondary}
          sx={{ mt: 0.5 }}
        >
          {isBulk ? "Bulk Order • " : ""}
          Unit Price: Rs. {unitPrice.toFixed(2)}
        </Typography>

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

        {isBulk && (
          <Typography
            variant="caption"
            color={colors.success}
            sx={{ display: "block", mt: 0.5 }}
          >
            ✓ Bulk discount applied
          </Typography>
        )}

        {/* {item.isDirectPurchase && (
          <Typography
            variant="caption"
            color={colors.primary}
            sx={{ display: "block", mt: 0.5 }}
          >
            ⚡ Direct Purchase
          </Typography>
        )} */}
      </Box>
    </Box>
  );
};

export default OrderItem;
