import { Box, Typography } from "@mui/material";
import { textFade } from "../ui/animations";
import AnimatedLetters from "../ui/animatedText";
import HeroActions from "./heroActions";

const HeroContent = ({ saleType }) => {
  const isAuction = saleType === "auction";

  return (
    <Box textAlign={{ xs: "center", md: "left" }} sx={{ p: 2 }}>
      {/* 🔔 Announcement */}
      <Typography
        sx={{
          mb: 1.5,
          fontWeight: 600,
          fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
          letterSpacing: "0.08em",
          color: isAuction ? "#9c2d2dff" : "#1b5e20",
          textTransform: "uppercase",
          animation: `${textFade} 0.8s ease-out both`,
        }}
      >
        {isAuction
          ? "🔴 Live Now — Bidding Has Started"
          : "🟢 Available Now — Buy Instantly"}
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: {
            xs: "1.4rem",
            sm: "2rem",
            md: "2rem",
            lg: "2.1rem",
          },
          lineHeight: { xs: 1.2, md: 1.3 },
          mb: 2,
          fontFamily:"-apple-system"
        }}
      >
        <AnimatedLetters
          text={isAuction ? "Bid Live on" : "Buy Direct from"}
        />
        <br />
        <AnimatedLetters
          text="Excess Inventory"
          delay={0.6}
        />
      </Typography>

      <Typography
        sx={{
          color: "#000",
          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
          maxWidth: "520px",
          mx: { xs: "auto", md: 0 },
          mb: { xs: 3, md: 4 },
          animation: `${textFade} 1s ease-out both`,
        }}
      >
        {isAuction
          ? "Bidding is live! Explore active auction listings and start bidding on high-value products in real time."
          : "Shop quality excess inventory at fixed prices. No bidding, no waiting — buy instantly and move faster."}
      </Typography>

      <HeroActions saleType={saleType} />
    </Box>
  );
};

export default HeroContent;
