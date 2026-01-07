// src/pages/product/components/QuantitySelector.jsx
import { Box, Button, Typography, Stack } from '@mui/material';

const QuantitySelector = ({ quantity, setQuantity, stock }) => (
  <Box mb={3}>
    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
      Quantity
    </Typography>
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="outlined" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</Button>
      <Typography variant="h6">{quantity}</Typography>
      <Button variant="outlined" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= stock}>+</Button>
      <Typography variant="body2" color="text.secondary">Max: {stock}</Typography>
    </Stack>
  </Box>
);

export default QuantitySelector;
