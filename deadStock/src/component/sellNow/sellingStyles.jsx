import { Box, Grid, Typography } from "@mui/material";
import {
  fadeInUp,
  pulseAnimation,
  letterReveal,
} from "../ui/animations";
const styles = [
  {
    title: "Direct Purchase",
    desc: "Buyers purchase instantly. Simple and predictable.",
  },
  {
    title: "Real-Time Bidding",
    desc: "Run auctions to drive up the price for high-demand items.",
  },
  {
    title: "Auto-Depreciation",
    desc: "Prices drop automatically over time. Best for clearing space fast.",
  },
];

const SellingStyles = () => {
  return (
    <Box py={{ xs: 8, md: 10 }} px={2} textAlign="center">
      {/* ===== HEADING ===== */}
      <Typography
        variant="h5"
        fontWeight={800}
        mb={1}
        sx={{
          animation: `${letterReveal} 0.8s ease forwards`,
        }}
      >
        Choose your selling style
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={6}
        sx={{
          maxWidth: 420,
          mx: "auto",
          animation: `${fadeInUp} 1s ease forwards`,
        }}
      >
        Pick the strategy that fits your inventory and selling goals.
      </Typography>

      {/* ===== CARDS ===== */}
      <Grid container spacing={2} justifyContent="center">
        {styles.map((style, i) => (
          <Grid item xs={12} sm={6} md={6} key={i}>
            <Box
              sx={{
                maxWidth:350,
                p: 4,
                height: "100%",
                borderRadius: 4,
                background:
                  "linear-gradient(180deg, #ffffff 0%, #f8fdfb 100%)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                textAlign: "left",
                animation: `${fadeInUp} 0.8s ease forwards`,
                animationDelay: `${i * 0.15}s`,
                transition: "all 0.35s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Accent bar */}
              <Box
                sx={{
                  width: "30%",
                  height: 4,
                  borderRadius: 2,
                  mb: 2,
                  background: "linear-gradient(135deg, #1DE96B, #2E7D32)",
                  animation: `${pulseAnimation} 2.5s ease-in-out infinite`,
                }}
              />

              <Typography variant="h6" fontWeight={700} mb={1}>
                {style.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {style.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SellingStyles;
