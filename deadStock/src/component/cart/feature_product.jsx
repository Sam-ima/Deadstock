import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import ProductCard from './ProductCard';

const FeatureProduct = ({ products, onAddToCart }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        bgcolor: 'background.paper',
        borderRadius: 3,
        mb: 4
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: 'primary.main',
          mb: 3,
          pb: 2,
          borderBottom: '3px solid',
          borderColor: 'warning.light'
        }}
      >
        Featured Products
      </Typography>
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default FeatureProduct;