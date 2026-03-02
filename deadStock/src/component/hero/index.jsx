import { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import HeroContent from "./heroContent";
import HeroImage from "./heroImage";
import { getAllProducts } from "../../services/productService";

const Hero = () => {
  const [saleType, setSaleType] = useState("direct");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getAllProducts();

        // Count auction products
        const auctionProducts = products.filter(
          (p) => p.saleType === "auction",
        );

        // 🔑 DECISION BASED ON LENGTH
        if (auctionProducts.length > 0) {
          setSaleType("auction");
        } else {
          setSaleType("direct");
        }
      } catch (error) {
        console.error("Failed to load products", error);
        setSaleType("direct"); // safe fallback
      }
    };

    loadProducts();
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "30vh", sm: "40vh", md: "80vh", lg: "80vh" },
        display: "flex",
        alignItems: "center",
        bgcolor: "#fff",
        color: "#FFD2C2",
        overflow: "hidden",
        mt: { xs: "65px", sm: "100px", md: "20px", lg: "30px" },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 4, md: 0 }}
          sx={{ border: "3px solid red" }}
        >
          <Grid item xs={12} md={6}>
            <HeroContent saleType={saleType} />
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
