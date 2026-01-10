import React from "react";
import {
  Paper,
  Stack,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
} from "@mui/material";
import {
  Timer,
  MonetizationOn,
  Person,
  Star,
  Gavel,
} from "@mui/icons-material";

const AuctionTimer = ({ product, onPlaceBid }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: { xs: 2, md: 3 },
        backgroundColor: "#1B5E20",
        color: "white",
      }}
    >
      <Stack spacing={{ xs: 2, sm: 3 }}>
        {/* Timer */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Timer sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: "#d8a855" }} />

          <Box>
            <Typography
              variant="body2"
              sx={{ opacity: 0.9, fontSize: { xs: 12, sm: 14 } }}
            >
              Auction Ends In
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }}
            >
              {product.timeLeft}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Bids */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                <MonetizationOn fontSize="small" sx={{ mr: 0.5 }} />
                Current Bid
              </Typography>

              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ color: "#d8a855" }}
              >
                ${product.currentBid.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                <Star fontSize="small" sx={{ mr: 0.5 }} />
                Highest Bid
              </Typography>

              <Typography variant="h6" fontWeight={800}>
                ${product.highestBid.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Highest Bidder */}
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            p: { xs: 1, sm: 2 },
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">
            <Person fontSize="small" sx={{ mr: 0.5 }} />
            Highest Bidder: <b>{product.highestBidder}</b>
          </Typography>
        </Box>

        {/* 🔥 Place Bid Button */}
        <Button
          fullWidth
          size="large"
          startIcon={<Gavel />}
          onClick={onPlaceBid}
          sx={{
            mt: 1,
            py: 1.5,
            fontWeight: 700,
            textTransform: "none",
            color: "#1B5E20",
            background:
              "linear-gradient(135deg, #FFD54F 0%, #FFB300 100%)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #FFB300 0%, #FFA000 100%)",
            },
          }}
        >
          Place Bid
        </Button>
      </Stack>
    </Paper>
  );
};

export default AuctionTimer;
