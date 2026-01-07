// src/components/product/ProductStock.jsx
import { Box, Typography } from "@mui/material";

const ProductStock = ({ stock, sold }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 1,
        pt: { xs: 1, sm: 1.2, md: 1.5 },
        borderTop: '1px solid #f0f0f0'
      }}
    >
      <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' } }} color="text.secondary" fontWeight={500}>
        {stock > 0 ? `In Stock: ${stock}` : 'Out of Stock'}
      </Typography>

      <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' } }} color="text.secondary" fontWeight={500}>
        Sold: {sold}
      </Typography>
    </Box>
  );
};

export default ProductStock;
