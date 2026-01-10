import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { getProductBySlug } from "../../../services/productService";

import ProductImages from "./productImages";
import ProductInfo from "./productInfo";
import ProductTabs from "./productTabs";

const ProductDetailPage = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data || null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", pt: { xs: "30px", sm: "35px", md: "40px" } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box display={{ xs: "block", md: "flex" }} gap={4}>
          <ProductImages
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isFavorite={isFavorite}
            setIsFavorite={() => setIsFavorite(v => !v)}
          />

          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </Box>

        <ProductTabs
          product={product}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
