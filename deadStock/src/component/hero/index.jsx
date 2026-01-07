import { Box, Container, Grid } from "@mui/material";
import HeroContent from "./heroContent";
import HeroImage from "./heroImage";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "30vh",sm:"40vh", md: "80vh",lg:"80vh" },
        display: "flex",
        alignItems: "center",
        bgcolor: "#fff",
        color: "#FFD2C2",
        overflow: "hidden",
        mt: { xs: "65px", sm: "100px", md: "20px",lg:"10px" },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 4, md: 0 }}
          sx={{ border:"3px solid red",}}
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
