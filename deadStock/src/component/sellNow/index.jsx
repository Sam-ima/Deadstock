import { Box } from "@mui/material";
import HeroSection from "./firstHeroSection";
import HowItWorks from "./howItWorks";
import SellerTypes from "./sellerTypes";
import SellingStyles from "./sellingStyles";


const MainSellingPage = () => {
  return (
    <Box sx={{ mt: { xs: 8, sm: 10, md: 12 } }}>
      <HeroSection />
      <HowItWorks />
      <SellerTypes />
      <SellingStyles />
      {/* <CTASection /> */}
    </Box>
  );
};

export default MainSellingPage;
