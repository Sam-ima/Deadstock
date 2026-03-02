import { Box, Container } from "@mui/material";
import HeroSection from "./firstHeroSection";
import HowItWorks from "./howItWorks";
import SellerTypes from "./sellerTypes";
import SellingStyles from "./sellingStyles";

const MainSellingPage = () => {
  return (
    <Box sx={{ mt: { xs: 8, sm: 10, md: 12 } }}>
      <Container maxWidth="lg">
        <HeroSection />
      </Container>

      <Box sx={{ bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <HowItWorks />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <SellerTypes />
      </Container>

      <Box sx={{ bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <SellingStyles />
        </Container>
      </Box>
    </Box>
  );
};

export default MainSellingPage;