import { Box, Typography, Button } from '@mui/material';

const ProductDetail = ({ product }) => {
  return (
    <Box p={4}>
      <img src={product.image} width="300" />
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h6">${product.price}</Typography>
      <Typography>{product.description}</Typography>

      <Button variant="contained" sx={{ mt: 2 }}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default ProductDetail;
