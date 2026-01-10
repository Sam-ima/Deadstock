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
      elevation={3}
      sx={{
        width: "100%",
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: { xs: 2, md: 3 },
        background: "#ffffff",
        color: "#333333",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <Stack spacing={{ xs: 2, sm: 3 }}>
        {/* Timer */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Timer sx={{ 
            fontSize: { xs: 24, sm: 28, md: 32 }, 
            color: "#2E7D32",
          }} />

          <Box>
            <Typography
              variant="body2"
              sx={{ 
                color: "#666666",
                fontSize: { xs: 12, sm: 14 },
              }}
            >
              Auction Ends In
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ 
                fontSize: { xs: 20, sm: 24, md: 28 },
                color: "#2E7D32",
              }}
            >
              {product.timeLeft}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.08)" }} />

        {/* Bids */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ color: "#666666" }}>
                <MonetizationOn fontSize="small" sx={{ mr: 0.5, color: "#2E7D32" }} />
                Current Bid
              </Typography>

              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ 
                  color: "#2E7D32",
                }}
              >
                ${product.currentBid.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ color: "#666666" }}>
                <Star fontSize="small" sx={{ mr: 0.5, color: "#FF9800" }} />
                Highest Bid
              </Typography>

              <Typography 
                variant="h6" 
                fontWeight={800}
                sx={{ 
                  color: "#FF9800",
                }}
              >
                ${product.highestBid.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Highest Bidder */}
        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Person sx={{ color: "#1976D2" }} />
            <Typography variant="body2" sx={{ color: "#333333" }}>
              Highest Bidder: <b style={{ color: "#1976D2" }}>{product.highestBidder}</b>
            </Typography>
          </Stack>
        </Box>

        {/* Place Bid Button */}
        <Button
          fullWidth
          size="large"
          startIcon={<Gavel />}
          onClick={onPlaceBid}
          sx={{
            mt: 1,
            py: 1.8,
            fontWeight: 700,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            textTransform: "none",
            color: "white",
            background:
              "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
            borderRadius: 2,
            "&:hover": {
              background:
                "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
              boxShadow: "0 6px 20px rgba(46, 125, 50, 0.3)",
            },
          }}
        >
          Place Your Bid
        </Button>
      </Stack>
    </Paper>
  );
};

export default AuctionTimer;