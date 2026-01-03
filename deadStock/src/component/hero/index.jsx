import { Box, Container, Grid } from "@mui/material";
import HeroContent from "./heroContent";
import HeroImage from "./heroImage";

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: { xs: "70vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #194638ff 0%, #d8a855ff 100%)",
        color: "#fff",
        overflow: "hidden",
        py: { xs: 6, sm: 8, md: 0 },
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
