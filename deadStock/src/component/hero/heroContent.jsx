import { Box, Typography } from "@mui/material";
import { textFade } from "../ui/animations";
import AnimatedLetters from "../ui/animatedText";
import HeroActions from "./HeroActions";

const HeroContent = () => {
  return (
    <Box textAlign={{ xs: "center", md: "left" }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: {
            xs: "0.8rem",
            sm: "1rem",
            md: "3.2rem",
            lg: "3.6rem",
          },
          lineHeight: { xs: 1.2, md: 1.3 },
          mb: 2,
        }}
      >
        <AnimatedLetters text="Turn Inventory" />
        <br />
        <AnimatedLetters text="Into Opportunity" delay={0.6} />
      </Typography>

      <Typography
        sx={{
          color: "rgba(255,255,255,0.85)",
          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
          maxWidth: "520px",
          mx: { xs: "auto", md: 0 },
          mb: { xs: 3, md: 4 },
          animation: `${textFade} 1s ease-out both`,
        }}
      >
        Buy and sell excess stock through real-time auctions. Simple, fast, and
        built for modern businesses.
      </Typography>

      <HeroActions />
    </Box>
  );
};

export default HeroContent;
