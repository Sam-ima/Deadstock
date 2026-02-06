import { Box, Container } from "@mui/material";
// import EndingSoon from "../component/ Auction/ending_soon_section";
import BiddingSection from "../component/ auction/biddingSection";
import LiveAuctionSection from "../component/ auction/LiveAuctionSection";
import UpcomingAuctions from "../component/ auction/UpcomingAuctions";
// import { LiveActivity, SellerSpotlight, TrustSecurity, StatsBar } from "../component/auction";

const AuctionsPage = () => {
  return (
    <Container
    maxWidth="lg"
      sx={{
        mb: 0,
        paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
        paddingBottom: "0px",
      }}
    >
      <LiveAuctionSection />
      <BiddingSection />
      <UpcomingAuctions />
    </Container>
  );
};

export default AuctionsPage;
