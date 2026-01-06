// src/components/auction/AuctionTimer.jsx
import { Paper, Typography, Stack } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";

const AuctionTimer = ({ product }) => (
  <Paper sx={{ p: 3, bgcolor: "#1B5E20", color: "white" }}>
    <Typography>Auction Ends In</Typography>
    <Typography variant="h4">{product.timeLeft}</Typography>

    <Stack direction="row" spacing={2} mt={2}>
      <Typography>
        <MonetizationOn /> Current Bid: ${product.currentBid}
      </Typography>
    </Stack>
  </Paper>
);

export default AuctionTimer;
