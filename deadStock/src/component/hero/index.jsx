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
        bgcolor: "#fff",
        color: "#FFD2C2",
       
        overflow: "hidden",
        py: { xs: 10, sm: 8, md: 5 },

      
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
