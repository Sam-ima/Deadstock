import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import ProductDetail from "../component/productdetai";
import { useParams } from "react-router-dom";
import { products } from "../component/data/products_data"; 
import { Box } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProduct = () => {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container
        maxWidth
        disableGutters
        sx={{
          paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
          paddingBottom: "0px",
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
        maxWidth
        disableGutters
        sx={{
          paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
          paddingBottom: "0px",
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
      maxWidth
      disableGutters
      sx={{
        paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
        paddingBottom: "0px",
        minHeight: "100vh",
         
      }}
    >
      <ProductDetail product={product} />
    </Container>
  );
};

export default ProductDetailPage;