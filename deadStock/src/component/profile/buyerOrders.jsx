import { Paper, Typography } from "@mui/material";

const buyerOrders = ({ orders }) => {
  return orders.map(order => (
    <Paper
      key={order.id}
      sx={{ p: 2, mb: 2, cursor: "pointer" }}
      onClick={() => alert(`Order: ${order.product}`)}
    >
      <Typography fontWeight={600}>{order.product}</Typography>
      <Typography>${order.price}</Typography>
      <Typography color="success.main">{order.status}</Typography>
    </Paper>
  ));
};

export default buyerOrders;
