import { Paper, Typography } from "@mui/material";

const sellerProducts = ({ products }) => {
  return products.map(product => (
    <Paper key={product.id} sx={{ p: 2, mb: 2 }}>
      <Typography fontWeight={600}>{product.name}</Typography>
      <Typography>${product.price}</Typography>
    </Paper>
  ));
};

export default sellerProducts;
