// src/pages/categories/CategoryContent.jsx
import { Box, Typography, Grid } from '@mui/material';
import ProductCard from '../product/productCard';

const CategoryContent = ({
  category,
  products,
  activeSubcategory,
}) => {
  return (
    <Box flex={1} p={{ xs: 2, sm: 3, md: 4 }}>
      <Typography fontWeight={800} mb={1} fontSize="2rem">
        {category.name}
      </Typography>

      <Typography color="text.secondary" mb={4}>
        {activeSubcategory
          ? `Showing items in ${activeSubcategory.name}`
          : 'Featured items from this category'}
      </Typography>

      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryContent;
