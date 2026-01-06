import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography, Button, Breadcrumbs, Link } from "@mui/material";
import products from "../component/data/products_data"; 

const ProductDetailPage = () => {
  // 1. Grab params from URL
  const { slug, title } = useParams();
  const navigate = useNavigate();

  // 2. Filter data: Replace hyphens in URL title back to spaces to match data
  const formattedTitle = title.replace(/-/g, " ");
  
  const product = products.find(
    (p) => p.name.toLowerCase() === formattedTitle.toLowerCase()
  );

  // 3. Handle product not found
  if (!product) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5">Product not found</Typography>
        <Button onClick={() => navigate('/category')}>Back to Categories</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Breadcrumbs for better UX */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          Home
        </Link>
        <Link underline="hover" color="inherit" onClick={() => navigate(`/category/${slug}`)} sx={{ cursor: 'pointer' }}>
          {slug.toUpperCase()}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={6}>
        {/* Left Side: Product Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.img}
            alt={product.name}
            sx={{
              width: "100%",
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              objectFit: "cover"
            }}
          />
        </Grid>

        {/* Right Side: Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="overline" color="primary" fontWeight={700}>
            {product.category}
          </Typography>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2, my: 3 }}>
            <Typography variant="h6">Current Bid</Typography>
            <Typography variant="h3" color="secondary" fontWeight={700}>
              ${product.currentBid}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.bids} bids so far
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" mb={4}>
            This is a rare {product.name} from the {product.category} category. 
            Don't miss out on this deadstock item!
          </Typography>

          <Button 
            variant="contained" 
            size="large" 
            fullWidth 
            sx={{ py: 2, fontSize: '1.1rem', fontWeight: 700 }}
          >
            Place Bid Now
          </Button>

          <Box mt={3}>
            <Typography variant="subtitle2">Time Left: <strong>{product.timeLeft}</strong></Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;