// src/pages/categories/components/CategoryBanner.jsx
import { Box, Typography, Container } from "@mui/material";
import { getCategoryImage } from "./categoryImages";
import CategoryHeaderChips from "./CategoryHeaderChips";

const CategoryBanner = ({ category, products, activeSubcategory }) => {
  const bannerImage = getCategoryImage(category.name);

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden", mb: { xs: 2, sm: 3, md: 4 } }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 300, sm: 350, md: 450, lg: 550, xl: 650 },
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" },
            textAlign: { xs: "center", sm: "left" },
            color: "white",
          }}
        >
          <Typography
            fontWeight={900}
            sx={{
              fontSize: { xs: 24, sm: 28, md: 32, lg: 40, xl: 48 },
              mb: 2,
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {category.name}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
              mb: 4,
              maxWidth: "70%",
              textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {category.description}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <CategoryHeaderChips
              category={category}
              activeSubcategory={activeSubcategory}
              products={products}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CategoryBanner;
