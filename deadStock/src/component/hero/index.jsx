import { Box, Container, Grid } from "@mui/material";
import HeroContent from "./heroContent";
import HeroImage from "./heroImage";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "70vh", md: "80vh" },
        display: "flex",
        alignItems: "center",
        bgcolor: "rgba(255, 61, 0, 0.15)",
        color: "#FFD2C2",
        overflow: "hidden",
        py: { xs: 6, sm: 8, md: 0 },

        /* 🌊 Curved Bottom */
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -1,
          left: 0,
          width: "100%",
          height: { xs: "80px", md: "120px" },
          bgcolor: "#fff", // next section background
          borderTopLeftRadius: "50% 100%",
          borderTopRightRadius: "50% 100%",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 4, md: 0 }}
        >
          <Grid item xs={12} md={6}>
            <HeroContent />
          </Grid>

          <Grid item xs={12} md={6}>
            <HeroImage />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
