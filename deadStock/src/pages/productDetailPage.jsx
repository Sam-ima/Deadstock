import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetail from "../component/productdetai";
import { products } from "../component/data/products_data";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find(
      (p) => p.id === parseInt(id)
    );
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
           
        }}
      >
        <Box>Loading...</Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>Product not found</Box>
      </Container>
    );
  }

  return (
    <Container
      // maxWidth={false}
      disableGutters
      sx={{
        pt: { xs: "56px", md: "64px" },
        minHeight: "100vh",
        border:"2px solid red"
      }}
    >
      <ProductDetail product={product} />
    </Container>
  );
};

export default ProductDetailPage;
