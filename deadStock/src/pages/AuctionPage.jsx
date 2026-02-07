import { Box, Container } from "@mui/material";
// import EndingSoon from "../component/ Auction/ending_soon_section";
import BiddingSection from "../component/auction/biddingSection";
import LiveAuctionSection from "../component/auction/LiveAuctionSection";
import UpcomingAuctions from "../component/auction/UpcomingAuctions";
// import { LiveActivity, SellerSpotlight, TrustSecurity, StatsBar } from "../component/auction";

const AuctionsPage = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        pt: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
      }}
    >
      <LiveAuctionSection />
      {/* <BiddingSection /> */}
      <UpcomingAuctions />
    </Box>
  );
};

export default AuctionsPage;
