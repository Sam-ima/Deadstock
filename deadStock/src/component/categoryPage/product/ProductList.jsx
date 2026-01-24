import { Grid } from "@mui/material";
import ProductCard from "./productCard";

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map(product => (
        <Grid
          item
          key={product.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          justifyContent="center"
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
