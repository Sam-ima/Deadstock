// src/pages/product/components/ActionButtons.jsx
import { Stack, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const ActionButtons = ({ product, quantity }) => {
  const handleAddToCart = () => console.log(`Added ${quantity} of ${product.name} to cart`);
  const handleBuyNow = () => console.log(`Buying ${quantity} of ${product.name}`);

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
      <Button variant="contained" size="large" startIcon={<ShoppingCart />} onClick={handleAddToCart} disabled={product.stock === 0} sx={{ flex: 1 }}>
        Add to Cart
      </Button>
      <Button variant="outlined" size="large" onClick={handleBuyNow} disabled={product.stock === 0} sx={{ flex: 1 }}>
        Buy Now
      </Button>
    </Stack>
  );
};

export default ActionButtons;
