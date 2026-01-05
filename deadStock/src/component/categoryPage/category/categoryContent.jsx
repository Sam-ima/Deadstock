import { Box, Typography, Grid, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import ProductCard from '../product/productCard';

const CategoryContent = ({ category, products }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Initial visible cards based on screen size
  const initialLimit = isMobile ? 4 : isTablet ? 6 : 8;

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Reset when category or screen size changes
    setShowAll(false);
  }, [category, initialLimit]);

  const visibleProducts = showAll
    ? products
    : products.slice(0, initialLimit);

  return (
    <Box flex={1} p={{ xs: 2, sm: 3, md: 4 }}>
      {/* Category Title */}
      <Typography
        fontWeight={800}
        mb={1}
        fontSize={{ xs: '1.4rem', sm: '1.8rem', md: '2.1rem' }}
      >
        {category.name}
      </Typography>

      {/* Category Description */}
      <Typography
        color="text.secondary"
        mb={4}
        fontSize={{ xs: '0.9rem', sm: '1rem' }}
      >
        {category.description}
      </Typography>

      {/* Products Grid */}
      <Grid container spacing={3} justifyContent="center">
        {visibleProducts.map(product => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={product.id}
            display="flex"
            justifyContent="center"
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Show More / Show Less */}
      {products.length > initialLimit && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            onClick={() => setShowAll(prev => !prev)}
            sx={{
              color: '#2E7D32',
              borderColor: '#2E7D32',
              borderRadius: 3,
              px: 4,
              py: 1.2,
              fontWeight: 600,
              textTransform: 'none',

              /* Smooth transition */
              transition: 'all 0.25s ease',

              '&:hover': {
                backgroundColor: 'rgba(46, 125, 50, 0.08)',
                borderColor: '#1B5E20',
                color: '#1B5E20',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
              },

              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              },
            }}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        </Box>
      )}

    </Box>
  );
};

export default CategoryContent;
