import { Box, Typography } from "@mui/material";
// import OrderItem from "./orderItem"; // make sure orderItem.jsx has default export

const ordersList = ({ sellerData }) => {
  const orders = sellerData?.orders || [];

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography fontWeight={600}>Recent Orders</Typography>
        <Typography color="green" sx={{ cursor: "pointer" }}>
          View All
        </Typography>
      </Box>

      {/* Orders */}
      {orders.length === 0 ? (
        <Typography color="text.secondary">No orders found</Typography>
      ) : (
        orders.map((order) => (
          <OrderItem key={order.id} order={order} /> // ✅ pass individual order
        ))
      )}
    </Box>
  );
};

export default ordersList;
