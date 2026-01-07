// import {
//   Box,
//   Typography,
//   Chip
// } from "@mui/material";

// const statusColor = {
//   Delivered: "success",
//   Shipped: "info",
//   Processing: "warning",
// };

// const orderItem = ({ order }) => {
//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       p={2}
//       mt={1}
//       borderRadius={2}
//       bgcolor="#f9f9f9"
//       sx={{
//         cursor: "pointer",
//         "&:hover": {
//           boxShadow: 3,
//           transform: "scale(1.01)",
//         },
//         transition: "0.2s"
//       }}
//     >
//       <img src={order.image} width={60} />

//       <Box ml={2} flex={1}>
//         <Typography fontWeight={600}>{order.title}</Typography>
//         <Typography variant="body2" color="text.secondary">
//           Size: {order.size} • {order.date}
//         </Typography>
//         <Chip
//           label={order.status}
//           color={statusColor[order.status]}
//           size="small"
//         />
//       </Box>

//       <Typography fontWeight={700}>${order.price}</Typography>
//     </Box>
//   );
// };

// export default orderItem;

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
        "&:hover": { boxShadow: 2, transition: "0.3s" },
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
        <Typography color="text.secondary" variant="body2">
          Category: {order.category}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Current Bid: ${order.currentBid}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Highest Bidder: {order.highestBidder}
        </Typography>
      </Box>
      <Typography color="green" fontWeight={600}>
        {order.timeLeft} left
      </Typography>
    </Box>
  );
};

export default orderItem; // ✅ Default export fixes your import
