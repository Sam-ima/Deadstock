import { Box, Typography } from "@mui/material";
import { textFade } from "../ui/animations";
import AnimatedLetters from "../ui/animatedText";
import HeroActions from "./heroActions";
import { keyframes } from "@mui/system";

// Pulsing ring animation (Instagram Live style)
const livePulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
  100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
`;

const liveDot = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
`;

const HeroContent = ({ saleType }) => {
  const isAuction = saleType === "auction";

  return (
    <Box textAlign={{ xs: "center", md: "left" }} sx={{ p: 2 }}>
      {/* 🔔 Announcement */}
      {isAuction ? (
        // ── LIVE badge (Instagram-style) ──────────────────────────
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            mb: 1.5,
            px: 1.4,
            py: 0.5,
            borderRadius: "999px",
            background: "rgba(220, 38, 38, 0.08)",
            border: "1.5px solid rgba(220, 38, 38, 0.35)",
            animation: `${livePulse} 1.8s ease-out infinite`,
          }}
        >
          {/* Pulsing red dot */}
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#dc2626",
              animation: `${liveDot} 1.2s ease-in-out infinite`,
              flexShrink: 0,
            }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
              letterSpacing: "0.1em",
              color: "#dc2626",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Live Now — Bidding Has Started
          </Typography>
        </Box>
      ) : (
        // ── Available Now (unchanged style) ──────────────────────
        <Typography
          sx={{
            mb: 1.5,
            fontWeight: 600,
            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
            letterSpacing: "0.08em",
            color: "#1b5e20",
            textTransform: "uppercase",
            animation: `${textFade} 0.8s ease-out both`,
          }}
        >
          🟢 Available Now — Buy Instantly
        </Typography>
      )}

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
          fontFamily: "-apple-system",
        }}
      >
        <AnimatedLetters text={isAuction ? "Bid Live on" : "Buy Direct from"} />
        <br />
        <AnimatedLetters text="Excess Inventory" delay={0.6} />
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