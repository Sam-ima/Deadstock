import { Box, Typography, Grid } from '@mui/material';
import ProductCard from './productCard';

const CategoryContent = ({ category, products }) => {
  return (
    <Box flex={1} p={4}>
      <Typography variant="h4" fontWeight={800} mb={1}>
        {category.name}
      </Typography>

      <Typography color="text.secondary" mb={4}>
        {category.description}
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
