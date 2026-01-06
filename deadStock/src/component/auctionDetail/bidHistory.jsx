// src/components/auction/BidHistory.jsx
import { Paper, Typography, Stack } from "@mui/material";

const BidHistory = ({ bids }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6">Recent Bids</Typography>
    <Stack spacing={1}>
      {bids.map((b, i) => (
        <Typography key={i}>
          {b.bidder} — ${b.amount}
        </Typography>
      ))}
    </Stack>
  </Paper>
);

export default BidHistory;
