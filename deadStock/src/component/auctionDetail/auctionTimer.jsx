// src/components/ProductDetail/AuctionTimer.jsx
import React from "react";
import { Paper, Stack, Typography, Grid, Box, Divider  } from "@mui/material";
import { Timer, MonetizationOn, Person, Star } from "@mui/icons-material";

const AuctionTimer = ({ product }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: "#1B5E20",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Timer sx={{ fontSize: 32, color: "#d8a855" }} />
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Auction Ends In</Typography>
            <Typography variant="h4" fontWeight={700}>{product.timeLeft}</Typography>
          </Box>
        </Stack>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                <MonetizationOn fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Current Bid
              </Typography>
              <Typography variant="h3" fontWeight={800} sx={{ color: "#d8a855", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                ${product.currentBid.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                <Star fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Highest Bid
              </Typography>
              <Typography variant="h3" fontWeight={800} sx={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                ${product.highestBid.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ backgroundColor: "rgba(255,255,255,0.1)", p: 2, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
            Highest Bidder: <b>{product.highestBidder}</b>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AuctionTimer;
