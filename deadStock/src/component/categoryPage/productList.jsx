import { Grid } from '@mui/material';
import ProductCard from './productCard';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map(product => (
        <Grid item key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
