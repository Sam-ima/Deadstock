import React from "react";
import { Box, Typography } from "@mui/material";
import { EndingSoon, UpcomingAuctions, LiveActivity, SellerSpotlight, TrustSecurity, StatsBar } from "../component/auction";

const AuctionsPage = () => {
  return (
    <Box sx={{ mt: 15, mb: 10 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, px: 3 }}>
        Live Auctions
      </Typography>

      {/* Auction-specific sections */}
      <EndingSoon />
      <UpcomingAuctions />
      <LiveActivity />
      <SellerSpotlight />
      <TrustSecurity />
      <StatsBar />
    </Box>
  );
};

export default AuctionsPage;
