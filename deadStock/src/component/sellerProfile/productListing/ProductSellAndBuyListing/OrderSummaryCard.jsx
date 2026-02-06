import { Box, Typography, Button, Divider } from "@mui/material";
import { useState } from "react";
import ProductCard from "../../../categoryPage/product/productCard/ProductCard";

const CARD_HEIGHT = 300;
const ITEMS_COLLAPSED_HEIGHT = 50;

const OrderSummaryCard = ({ order, productsMap }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        width: { xs: 270, sm: 280, md: 280 },
        height: CARD_HEIGHT,
        p: 2,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <Box>
        <Typography variant="body2" color="text.secondary">
          Ordered At : {order.createdAt?.toDate().toLocaleString()}
        </Typography>
      </Box>

      {/* Payment Info */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.1 }}>
        <Typography variant="body2" color="text.secondary">
          Payment: {order.paymentMethod}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {order.paymentStatus}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          Total: Rs. {order.totalAmount}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Items */}
      <Typography variant="body2" fontWeight={600} mb={0.5}>
        Products
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: expanded ? "auto" : "hidden",
          maxHeight: expanded ? "none" : ITEMS_COLLAPSED_HEIGHT,
          pr: 0.5,
        }}
      >
        {order.items.map((orderItem, idx) => (
          <Box key={idx} mb={1}>
            {productsMap[orderItem.productId] ? (
              <ProductCard product={productsMap[orderItem.productId]} />
            ) : (
              <Typography variant="body2">
                {orderItem.quantity} × {orderItem.name} @ Rs.{orderItem.price}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* View More / Less */}
      {order.items.length > 3 && (
        <Button
          size="small"
          onClick={() => setExpanded((prev) => !prev)}
          sx={{ mt: 0.5, alignSelf: "center", textTransform: "none" }}
        >
          {expanded ? "View less" : "View more"}
        </Button>
      )}

      <Divider sx={{ my: 1 }} />

      {/* Delivery */}
      <Box>
        <Typography variant="caption" color="text.secondary">
          Delivery Address
        </Typography>
        <Typography variant="body2">
          {order.deliveryDetails?.address}, {order.deliveryDetails?.city},{" "}
          {order.deliveryDetails?.state}, {order.deliveryDetails?.zip}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderSummaryCard;
