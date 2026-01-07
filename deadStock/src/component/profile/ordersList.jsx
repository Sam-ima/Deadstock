import { useState } from "react";
import { Box, Typography } from "@mui/material";
import OrderItem from "./orderItem";
import buyerData from "../data/buyerData";

const ordersList = () => {
  const orders = buyerData.orders || [];
  const [showAll, setShowAll] = useState(false);

  const visibleOrders = showAll ? orders : orders.slice(0, 3);

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography fontWeight={600}>Recent Orders</Typography>

        {orders.length > 3 && (
          <Typography
            color="green"
            sx={{ cursor: "pointer", fontWeight: 500 }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </Typography>
        )}
      </Box>

      {/* Orders */}
      {visibleOrders.length === 0 ? (
        <Typography color="text.secondary">No orders found</Typography>
      ) : (
        visibleOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))
      )}
    </Box>
  );
};

export default ordersList;
