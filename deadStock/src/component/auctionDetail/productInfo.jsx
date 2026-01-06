// src/components/auction/ProductInfo.jsx
import { Box, Typography, Chip } from "@mui/material";

const ProductInfo = ({ product }) => (
  <Box>
    <Chip label={product.category} color="success" sx={{ mb: 1 }} />
    <Typography variant="h4" fontWeight={700}>
      {product.name}
    </Typography>
    <Typography color="text.secondary">
      {product.description}
    </Typography>
  </Box>
);

export default ProductInfo;
