import { Box, Typography } from "@mui/material";
import ProductCard from "../../../categoryPage/product/productCard/ProductCard";

const OrderSummaryCard = ({ order, productsMap }) => {
  return (
    <Box
      sx={{
        width: { xs: 270, sm: 280, md: 280 },
        p: 2,
        mb: 2,
        borderRadius: 3,
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Ordered At: {order.createdAt?.toDate().toLocaleString()}
      </Typography>

      <Typography variant="body2" mt={0.5}>
        Payment: {order.paymentMethod} - {order.paymentStatus}
      </Typography>

      <Typography variant="body2" mt={0.5}>
        Total: Rs.{order.totalAmount}
      </Typography>

      <Box mt={1}>
        <Typography variant="body2" fontWeight={500}>
          Items:
        </Typography>

        <Box ml={1} mt={0.5}>
          {order.items.map((orderItem, idx) => (
            <Box key={idx} mb={1}>
              {productsMap[orderItem.productId] ? (
                <ProductCard product={productsMap[orderItem.productId]} />
              ) : (
                <Typography variant="body2">
                  {orderItem.quantity} x {orderItem.name} @ Rs.
                  {orderItem.price} = Rs.{orderItem.subtotal}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Typography variant="body2" mt={1}>
        Delivery: {order.deliveryDetails?.address},{" "}
        {order.deliveryDetails?.city}, {order.deliveryDetails?.state},{" "}
        {order.deliveryDetails?.zip}
      </Typography>
    </Box>
  );
};

export default OrderSummaryCard;
