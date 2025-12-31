import React from "react";
import { Box } from "@mui/material";
import EndingSoon from "../component/ Auction/ending_soon_section";
import LiveAuctions from "../component/ Auction/live_auction_section";
import UpcomingAuctions from "../component/ Auction/upcoming_section";
// import { LiveActivity, SellerSpotlight, TrustSecurity, StatsBar } from "../component/auction";

const AuctionsPage = () => {
  return (
    <Box sx={{ mb: 10 }}>
      <LiveAuctions />
      <EndingSoon />
      <UpcomingAuctions />
      {/* <LiveActivity /> */}
      {/* <SellerSpotlight /> */}
      {/* <TrustSecurity /> */}
      {/* <StatsBar /> */}
    </Box>
  );
};

export default AuctionsPage;
