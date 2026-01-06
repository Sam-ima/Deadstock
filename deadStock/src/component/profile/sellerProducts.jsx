// component/profile/sellerProducts.jsx
import React, { useState } from 'react';
import sectionCard from '../common/sectionCard.jsx';
import { Box, Button, Grid, Dialog, Typography } from '@mui/material';
import ProductCard from './productCard.jsx';

const SellerProducts = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <sectionCard title="Your Products">
      <Button
        variant="contained"
        sx={{
          mb: 2,
          backgroundColor: '#4caf50',
          color: '#fff',
          '&:hover': { backgroundColor: '#388e3c' },
        }}
        onClick={() => setOpenAdd(true)}
      >
        Add Product
      </Button>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              onEdit={() => onEditProduct(product)}
              onDelete={() => onDeleteProduct(product.id)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <Box sx={{ p: 3, minWidth: 300 }}>
          <Typography variant="h6" sx={{ color: '#4caf50' }}>Add Product Form Placeholder</Typography>
        </Box>
      </Dialog>
    </sectionCard>
  );
};

export default SellerProducts;
