import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ProductCard from "../../../categoryPage/product/productCard/ProductCard";

const CARD_HEIGHT = 380;
const ITEMS_COLLAPSED_HEIGHT = 120;

const OrderSummaryCard = ({ order, productsMap }) => {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = order.createdAt
    ? order.createdAt.toDate().toLocaleString()
    : "N/A";

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        width: { xs: 290, sm: 320, md: 330 },
        height: CARD_HEIGHT,
        p: 2,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 14px 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ bgcolor: "#f57c00" }}>
          <ShoppingBagOutlinedIcon />
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            Order Summary
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      {/* Payment Info */}
      <Stack spacing={0.5}>
        <Typography variant="body2" color="text.secondary">
          Payment Method: <b>{order.paymentMethod}</b>
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Status:
          </Typography>
          <Chip
            label={order.paymentStatus}
            size="small"
            color={getStatusColor(order.paymentStatus)}
          />
        </Stack>

        <Typography variant="body1" fontWeight={700} color="#2e7d32">
          Total: Rs. {order.totalAmount}
        </Typography>
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      {/* Products */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Ordered Products
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: expanded ? "auto" : "hidden",
          maxHeight: expanded ? "none" : ITEMS_COLLAPSED_HEIGHT,
          transition: "all 0.3s ease",
          pr: 0.5,
        }}
      >
        {order.items.map((orderItem, idx) => {
          const product = productsMap[orderItem.productId];

          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1,
                mb: 1,
                borderRadius: 2,
                backgroundColor: "#fafafa",
                border: "1px solid #f0f0f0",
              }}
            >
              {/* Product Image */}
              {/* <Box
                component="img"
                src={
                  product?.image ||
                  "https://via.placeholder.com/60x60?text=Product"
                }
                alt={orderItem.name}
                sx={{
                  width: 55,
                  height: 55,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                }}
              /> */}

              {/* Product Info */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {orderItem.name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Qty: {orderItem.quantity}
                </Typography>

                <Typography variant="caption" color="text.secondary" display="block">
                  Price: Rs. {orderItem.price}
                </Typography>
              </Box>

              {/* Subtotal */}
              <Typography variant="body2" fontWeight={600}>
                Rs. {orderItem.quantity * orderItem.price}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {order.items.length > 2 && (
        <Button
          size="small"
          onClick={() => setExpanded((prev) => !prev)}
          sx={{
            mt: 0.5,
            alignSelf: "center",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {expanded ? "View Less ▲" : "View More ▼"}
        </Button>
      )}

      <Divider sx={{ my: 1.5 }} />

      {/* Delivery Section */}
      <Stack direction="row" spacing={1} alignItems="flex-start">
        <LocationOnOutlinedIcon sx={{ fontSize: 18, color: "#f57c00" }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            Delivery Address
          </Typography>
          <Typography variant="body2">
            {order.deliveryDetails?.address},{" "}
            {order.deliveryDetails?.city},{" "}
            {order.deliveryDetails?.state},{" "}
            {order.deliveryDetails?.zip}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default OrderSummaryCard;