import React from "react";
import { Paper, Stack, Typography, Grid, Box, Divider } from "@mui/material";
import { Timer, MonetizationOn, Person, Star } from "@mui/icons-material";

const AuctionTimer = ({ product }) => {
  return (
<Paper
  elevation={0}
  sx={{
    p: { xs: 2, sm: 3, md: 4 },
    borderRadius: { xs: 2, md: 3 },
    backgroundColor: "#1B5E20",
    color: "white",
    width: "100%",       
    // border: "5px solid purple",
  }}
>


      <Stack spacing={{ xs: 2, sm: 3 }}>
        {/* Timer */}
        <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
          <Timer sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: "#d8a855" }} />
          <Box>
            <Typography
              variant="body2"
              sx={{ opacity: 0.9, fontSize: { xs: 12, sm: 14, md: 16 } }}
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
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={6}>
            <Stack spacing={{ xs: 0.5, sm: 1 }}>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, fontSize: { xs: 11, sm: 12, md: 14 } }}
              >
                <MonetizationOn
                  fontSize="small"
                  sx={{ mr: 0.5, verticalAlign: "middle", fontSize: { xs: 14, sm: 16, md: 18 } }}
                />
                Current Bid
              </Typography>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  fontSize: { xs: 18, sm: 22, md: 26 },
                  color: "#d8a855",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                ${product.currentBid.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack spacing={{ xs: 0.5, sm: 1 }}>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, fontSize: { xs: 11, sm: 12, md: 14 } }}
              >
                <Star
                  fontSize="small"
                  sx={{ mr: 0.5, verticalAlign: "middle", fontSize: { xs: 14, sm: 16, md: 18 } }}
                />
                Highest Bid
              </Typography>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  fontSize: { xs: 18, sm: 22, md: 26 },
                  color: "white",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
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
            backgroundColor: "rgba(255,255,255,0.1)",
            p: { xs: 1, sm: 2 },
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, fontSize: { xs: 11, sm: 12, md: 14 } }}
          >
            <Person
              fontSize="small"
              sx={{ mr: 0.5, verticalAlign: "middle", fontSize: { xs: 14, sm: 16, md: 18 } }}
            />
            Highest Bidder: <b>{product.highestBidder}</b>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AuctionTimer;
