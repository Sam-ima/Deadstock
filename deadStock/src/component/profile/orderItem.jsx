import { Box, Typography, Avatar } from "@mui/material";

const orderItem = ({ order }) => {
  return (
    <Box
      mb={2}
      p={2}
      sx={{
        border: "1px solid #eee",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        "&:hover": { boxShadow: 2 },
      }}
    >
      <Avatar
        src={order.img}
        alt={order.name}
        variant="rounded"
        sx={{ width: 60, height: 60 }}
      />

      <Box flex={1}>
        <Typography fontWeight={600}>{order.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {order.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current Bid: ${order.currentBid}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Highest Bidder: {order.highestBidder}
        </Typography>
      </Box>

      <Typography color="green" fontWeight={600}>
        {order.timeLeft}
      </Typography>
    </Box>
  );
};

export default orderItem;
