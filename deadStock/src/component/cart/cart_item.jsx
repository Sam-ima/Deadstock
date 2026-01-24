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
        mb: { xs: 1.5, sm: 2 },
        p: { xs: 1.5, sm: 2 },
        backgroundColor: "#194638ff",
        color: "#FFFFFF",
        borderRadius: { xs: '10px', sm: '12px' },
        transition: "all 0.3s ease",
        "&:hover": { 
          transform: { xs: 'none', sm: 'scale(1.02)' },
          backgroundColor: { xs: '#194638ff', sm: '#1e4f40' },
        },
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
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
            fontSize: { 
              xs: '0.95rem', 
              sm: '1rem',
              md: '1.05rem' 
            },
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {displayName}
        </Typography>
        <Typography 
          variant="body2"
          sx={{ 
            color: "#90BE6D", 
            ml: 1,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontWeight: 600,
            flexShrink: 0,
            whiteSpace: 'nowrap',
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
            color: "#90EE90",
            fontStyle: "italic",
            display: "block",
            mb: 1,
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
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
          color: "rgba(255,255,255,0.8)",
          fontSize: { xs: '0.8rem', sm: '0.9rem' },
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          flexWrap: 'wrap',
        }}
      >
        <Box component="span">Rs.{formatPrice(unitPrice)}</Box>
        <Box component="span">×</Box>
        <Box component="span">{qty}</Box>
        <Box component="span">=</Box>
        <Box component="span" sx={{ fontWeight: 600 }}>
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
          sx={{
            flex: 1,
          }}
        >
          <IconButton
            size="small"
            sx={{ 
              color: "#FFFFFF", 
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.1)",
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              '&:hover': {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              '&:active': {
                transform: 'scale(0.95)',
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
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {qty}
          </Typography>

          <IconButton
            size="small"
            sx={{ 
              color: "#FFFFFF", 
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.1)",
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              '&:hover': {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              '&:active': {
                transform: 'scale(0.95)',
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
            color: "#FF6B6B",
            backgroundColor: "rgba(255,107,107,0.1)",
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            '&:hover': {
              backgroundColor: "rgba(255,107,107,0.2)",
            },
            '&:active': {
              transform: 'scale(0.95)',
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