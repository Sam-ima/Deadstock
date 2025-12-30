import { Box, Container, Typography, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeImage from "../../assets/dead_stock_image-removebg-preview.png";
import { floatAnimation, textFade } from "../ui/animations";
import AnimatedLetters from "../ui/animatedText";

const Hero = () => {
  return (
   
      <Box
        sx={{
          minHeight: { xs: "90vh", md: "100vh" },
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #194638ff 0%, #d8a855ff 100%)",
          color: "#fff",
          overflow: "hidden",
          py: { xs: 10, md: 0 },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={6}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* LEFT CONTENT */}
            <Grid
              item
              xs={12}
              md={6}
              // sx={{ animation: `${fadeInUp} 0.9s ease-out both` }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  lineHeight: { xs: 0.8, sm: 1, md: 1.6 },
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
                  fontSize: {
                    xs: "0.95rem",
                    sm: "1rem",
                    md: "1.1rem",
                  },
                  maxWidth: { xs: "100%", md: "480px" },
                  mb: { xs: 3, md: 4 },
                  animation: `${textFade} 1s ease-out both`,
                }}
              >
                Buy and sell excess stock through real-time auctions. Simple,
                fast, and built for modern businesses.
              </Typography>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #0b3d2e 0%, #145a43 100%)",
                  color: "#fff",
                  px: { xs: 3, md: 4 },
                  py: 1.5,
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    backgroundColor: "#d46c32",
                  },
                }}
              >
                Get Started
              </Button>
            </Grid>

            {/* RIGHT IMAGE */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  animation: `${floatAnimation} 5s ease infinite`,
                }}
              >
                {/* White curved background */}
                <Box
                  sx={{
                    position: "absolute",
                    width: { xs: "460px", md: "600px" },
                    height: { xs: "360px", md: "500px" },
                    // backgroundColor: "#f5f5f5",
                    // borderRadius: "180px 180px 40px 40px",
                  }}
                />

                {/* PNG Image */}
                <Box
                  component="img"
                  src={HomeImage}
                  alt="Hero"
                  sx={{
                    position: "relative",
                    width: { xs: "460px", md: "600px" },
                    zIndex: 2,
                    filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.3))",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
   
  );
};

export default Hero;
