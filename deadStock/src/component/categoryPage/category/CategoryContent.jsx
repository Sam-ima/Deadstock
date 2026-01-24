// src/pages/categories/CategoryContent.jsx
import { Box, Typography, Container } from "@mui/material";
import CategoryBanner from "./components/CategoryBanner";
import ProductGrid from "./components/ProductGrid";
import EmptyState from "./components/EmptyState";

const CategoryContent = ({ category, products, activeSubcategory }) => {
  if (!category) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h4" color="text.secondary">
          Category not found
        </Typography>
      </Box>
    );
  }

  const hasProducts = products?.length > 0;

  return (
    <Box sx={{ width: "100%" }}>
      <CategoryBanner
        category={category}
        products={products}
        activeSubcategory={activeSubcategory}
      />

      <Container maxWidth="xl">
        {hasProducts ? (
          <>
            <Typography fontWeight={700} mb={4} textAlign="center" fontSize={30}>
              {activeSubcategory
                ? `Browse ${activeSubcategory.name}`
                : `Explore ${category.name}`}
            </Typography>

            <ProductGrid products={products} />
          </>
        ) : (
          <EmptyState
            categoryName={activeSubcategory?.name || category.name}
          />
        )}
      </Container>
    </Box>
  );
};

export default CategoryContent;
