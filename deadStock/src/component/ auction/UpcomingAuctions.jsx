import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import UpcomingAuctionCard from "../card/auction card/upcoming_card";
import { upcomingAuctionData } from "../data/auction_data";

const UpcomingAuctions = () => {
  // ✅ FILTER ONLY SCHEDULED AUCTIONS
  const scheduledAuctions = upcomingAuctionData.filter(
    (product) => product?.auction?.status === "scheduled"
  );

  // ✅ DO NOT RENDER SECTION IF NO UPCOMING AUCTIONS
  if (scheduledAuctions.length === 0) return null;

  return (
    <Box sx={{ py: 10, backgroundColor: "#fff" }}>
      <Typography
        variant="h4"
        fontSize={{ xs: "1.6rem", sm: "1.8rem", md: "2.4rem" }}
        fontWeight={800}
        mb={5}
        textAlign="center"
      >
        Upcoming Auctions
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {scheduledAuctions.map((product) => (
          <Grid item key={product.id}>
            <UpcomingAuctionCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingAuctions;
