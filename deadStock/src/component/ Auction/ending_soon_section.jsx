import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import AuctionProductCard from "../card/auction card/bidding_card";
import { biddingItems } from "../data/bidding_data";
// import { endingSoonData } from "../data/auction_data";

const EndingSoon = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#fafafa" }}>
      <Typography variant="h4" fontWeight={800} mb={5} textAlign="center">
         Ending Soon
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {biddingItems.map((product) => (
          <Grid item key={product.id}>
            <AuctionProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EndingSoon;
