// src/pages/categories/components/ProductGrid.jsx
import { Grid, Box } from "@mui/material";
import ProductCard from "../../product/productCard/ProductCard";

const ProductGrid = ({ products }) => (
  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
    {products.map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <Box sx={{ maxWidth: 400, mx: "auto" }}>
          <ProductCard product={product} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default ProductGrid;
