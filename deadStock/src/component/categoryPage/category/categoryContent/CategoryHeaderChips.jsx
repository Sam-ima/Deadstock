// src/pages/categories/components/CategoryHeaderChips.jsx
import { Box, Typography } from "@mui/material";

const CategoryHeaderChips = ({ category, activeSubcategory, products }) => {
  if (activeSubcategory) {
    return (
      <>
        <Box
          sx={{
            px: 3,
            py: 1,
            borderRadius: "20px",
            backgroundColor: category.color,
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
          }}
        >
          {activeSubcategory.name}
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            fontWeight: 600,
            color: "#fff",
          }}
        >
          {products.length} products available
        </Typography>
      </>
    );
  }

  return (
    <Box
      sx={{
        px: 4,
        py: 1.5,
        borderRadius: "20px",
        backgroundColor: category.color,
        color: "white",
        fontWeight: 700,
        fontSize: { xs: "12px", sm: "14px", md: "16px" },
      }}
    >
      Featured Category Products
    </Box>
  );
};

export default CategoryHeaderChips;
