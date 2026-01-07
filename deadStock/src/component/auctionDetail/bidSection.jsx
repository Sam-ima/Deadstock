import React from "react";
import { Paper, Stack, Box, Button, TextField, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBid } from "../../store/slice/auctionSlice";

const BidSection = ({ product, onPlaceBid, onBuyNow }) => {
  const dispatch = useDispatch();
  const bidAmount = useSelector(
    (state) => state.auction.bids[product.id] || product.currentBid + 10
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: { xs: 2, md: 3 },
        backgroundColor: "#f8fff8",
        // border: "2px solid #e0f2e1",
        // border:"5px solid gray",
      }}
    >
      <Stack spacing={{ xs: 2, sm: 3 }}>
        {/* Place Bid Section */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: "#1B5E20", mb: { xs: 1.5, sm: 2 } }}
          >
            Place Your Bid
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2 }}
            alignItems="center"
            mb={1}
          >
            <TextField
              fullWidth
              type="number"
              label="Enter Bid Amount"
              value={bidAmount}
              onChange={(e) =>
                dispatch(
                  setBid({ productId: product.id, amount: parseFloat(e.target.value) })
                )
              }
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Typography
                    sx={{
                      color: "#2E7D32",
                      fontWeight: 600,
                      mr: 1,
                      fontSize: { xs: 12, sm: 14, md: 16 },
                    }}
                  >
                    $
                  </Typography>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "white",
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
              }}
            />
<Button
  variant="contained"
  onClick={() => onPlaceBid(bidAmount)}
  sx={{
    width: { xs: "100%", sm: "auto" },       // full width on mobile
    minWidth: { xs: "100%", sm: 140 },      // keep original minWidth on larger screens
    height: { xs: 34, sm: 40, md: 40 },     // responsive height
    borderRadius: { xs: 1.5, sm: 2 },       // slightly smaller radius on mobile
    fontWeight: 700,
    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, // responsive font
    backgroundColor: "#2E7D32",
    "&:hover": {
      backgroundColor: "#1B5E20",
      transform: "translateY(-1px)",
    },
    // py: { xs: 1, sm: 1.5, md: 2 },          // responsive vertical padding
    // px: { xs: 1, sm: 2, md: 3 },            // responsive horizontal padding
  }}
>
  Place Bid
</Button>

          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={{ xs: 10, sm: 12, md: 14 }}
          >
            Minimum bid increment: <b style={{ color: "#2E7D32" }}>$10</b>
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#c8e6c9" }} />

        {/* Quick Bid Buttons */}
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={1}
            fontSize={{ xs: 10, sm: 12, md: 14 }}
          >
            Quick Bid:
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1, md: 2 }}
            flexWrap="wrap"
            gap={1}
          >
            {[50, 100, 250, 500].map((amount) => (
              <Button
                key={amount}
                variant="outlined"
                onClick={() =>
                  dispatch(
                    setBid({ productId: product.id, amount: product.currentBid + amount })
                  )
                }
                sx={{
                  borderRadius: 2,
                  borderColor: "#4CAF50",
                  color: "#2E7D32",
                  fontWeight: 600,
                  fontSize: { xs: 10, sm: 12, md: 14 },
                  minWidth: { xs: "40px", sm: "60px" },
                  py: { xs: 0.5, sm: 1 },
                }}
              >
                +${amount}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Buy Now Button */}
       <Button
  variant="contained"
  fullWidth
  onClick={onBuyNow}
  sx={{
    // py: { xs: 1.5, sm: 2.5, md: 3 },          // responsive vertical padding
    // px: { xs: 1, sm: 2, md: 3 },              // responsive horizontal padding
    borderRadius: { xs: 2, sm: 3 },           // smaller radius on mobile
    fontWeight: 800,
    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },  // responsive font
    backgroundColor: "#d8a855",
    color: "#1B5E20",
    textTransform: "uppercase",
    letterSpacing: "1px",
    minHeight: { xs: 30, sm: 40, md: 50 },    // responsive height
    "&:hover": { backgroundColor: "#c89c48", transform: "translateY(-2px)" },
  }}
>
  Buy Now - $
  {product.buyNowPrice?.toLocaleString() ||
    (product.highestBid * 1.2).toLocaleString()}
</Button>

      </Stack>
    </Paper>
  );
};

export default BidSection;
