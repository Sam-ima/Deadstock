// src/components/ProductDetail/BidSection.jsx
import React from "react";
import { Paper, Stack, Box, Button, TextField, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBid } from "../../store/slice/auctionSlice";

const BidSection = ({ product, onPlaceBid, onBuyNow }) => {
  const dispatch = useDispatch();
  const bidAmount = useSelector((state) => state.auction.bids[product.id] || product.currentBid + 10);

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, backgroundColor: "#f8fff8", border: "2px solid #e0f2e1" }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ color: "#1B5E20", mb: 2 }}>
            Place Your Bid
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Enter Bid Amount"
              value={bidAmount}
              onChange={(e) => dispatch(setBid({ productId: product.id, amount: parseFloat(e.target.value) }))}
              variant="outlined"
              InputProps={{
                startAdornment: <Typography sx={{ color: "#2E7D32", fontWeight: 600, mr: 1 }}>$</Typography>,
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "white" } }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => onPlaceBid(bidAmount)}
              sx={{
                minWidth: 140,
                height: 56,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "1rem",
                backgroundColor: "#2E7D32",
                "&:hover": { backgroundColor: "#1B5E20", transform: "translateY(-2px)" },
              }}
            >
              Place Bid
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Minimum bid increment: <b style={{ color: "#2E7D32" }}>$10</b>
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#c8e6c9" }} />

        <Box>
          <Typography variant="body2" color="text.secondary" mb={2}>Quick Bid:</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
            {[50, 100, 250, 500].map((amount) => (
              <Button
                key={amount}
                variant="outlined"
                onClick={() => dispatch(setBid({ productId: product.id, amount: product.currentBid + amount }))}
                sx={{ borderRadius: 2, borderColor: "#4CAF50", color: "#2E7D32", fontWeight: 600 }}
              >
                +${amount}
              </Button>
            ))}
          </Stack>
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={onBuyNow}
          sx={{
            py: 3,
            borderRadius: 3,
            fontWeight: 800,
            fontSize: "1.2rem",
            backgroundColor: "#d8a855",
            color: "#1B5E20",
            textTransform: "uppercase",
            letterSpacing: "1px",
            "&:hover": { backgroundColor: "#c89c48", transform: "translateY(-3px)" },
          }}
        >
          Buy Now - ${product.buyNowPrice?.toLocaleString() || (product.highestBid * 1.2).toLocaleString()}
        </Button>
      </Stack>
    </Paper>
  );
};

export default BidSection;
