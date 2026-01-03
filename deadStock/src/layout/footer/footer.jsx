import { Box, Grid, Container } from "@mui/material";
import FooterBrand from "./footerBrand";
import FooterLinks from "./footerLinks";
import FooterContact from "./footerContact";
import FooterBottom from "./footerBottom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#194638ff",
        color: "#fff",
        mt: 8,
        pt: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6, lg: 10 }}>
          <Grid item xs={12} md={4}>
            <FooterBrand />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FooterLinks />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FooterContact />
          </Grid>
        </Grid>
      </Container>

      <FooterBottom />
    </Box>
  );
};

export default Footer;
