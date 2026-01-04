import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import UpcomingAuctionCard from "../card/auction card/upcoming_card";
import { upcomingAuctionData } from "../data/auction_data";

const UpcomingAuctions = () => {
  return (
    <Box sx={{ py: 10 , backgroundColor: "#fff" }}>
      <Typography variant="h4" fontWeight={800} mb={5} textAlign="center">
         Upcoming Auctions
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {upcomingAuctionData.map((product) => (
          <Grid item key={product.id}>
            <UpcomingAuctionCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingAuctions;
