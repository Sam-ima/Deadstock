// src/pages/product/ProductDetailPage.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  IconButton,
  Rating,
  Breadcrumbs,
  Link,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack,
  ShoppingCart,
  LocalShipping,
  Shield,
  Share,
  FavoriteBorder,
  Favorite,
  ZoomIn,
} from '@mui/icons-material';
import products from '../../data/products';
import categories from '../../data/categories';
import { subcategories } from '../../data/subcategories';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  const category = categories.find(c => c.slug === product.categorySlug);
  const subcategory = subcategories.find(s => s.id === product.subcategoryId);
  
  const discountPercent = product.basePrice > product.price
    ? Math.round(((product.basePrice - product.price) / product.basePrice) * 100)
    : 0;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log(`Buying ${quantity} of ${product.name}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Back Navigation */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary' }}
        >
          Back to {subcategory?.name || category?.name}
        </Button>
      </Container>

      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(`/category/${category?.slug}`)}
            sx={{ cursor: 'pointer' }}
          >
            {category?.name}
          </Link>
          {subcategory && (
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate(`/category/${category?.slug}?sub=${subcategory.id}`)}
              sx={{ cursor: 'pointer' }}
            >
              {subcategory.name}
            </Link>
          )}
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Left Column - Images */}
          <Grid item xs={12} md={6}>
            {/* Main Image */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
                position: 'relative',
                bgcolor: 'grey.50',
              }}
            >
              <Box
                component="img"
                src={product.images[selectedImage]}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'contain',
                  p: 2,
                }}
              />
              
              {/* Discount Badge */}
              {discountPercent > 0 && (
                <Chip
                  label={`${discountPercent}% OFF`}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    bgcolor: 'error.main',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              )}

              {/* Favorite Button */}
              <IconButton
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                {isFavorite ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Paper>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
                {product.images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      flexShrink: 0,
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      overflow: 'hidden',
                      border: selectedImage === index ? 2 : 1,
                      borderColor: selectedImage === index ? 'primary.main' : 'grey.300',
                      cursor: 'pointer',
                      opacity: selectedImage === index ? 1 : 0.7,
                      transition: 'all 0.2s',
                      '&:hover': {
                        opacity: 1,
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={`${product.name} - view ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            )}
          </Grid>

          {/* Right Column - Product Info */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Product Name */}
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {product.name}
              </Typography>

              {/* Rating */}
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography color="text.secondary">
                  {product.rating} ({product.reviews} reviews)
                </Typography>
                <Chip
                  label={`${product.sold} sold`}
                  size="small"
                  variant="outlined"
                />
              </Stack>

              {/* Price */}
              <Box mb={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h3" fontWeight="bold" color="primary.main">
                    ${product.price}
                  </Typography>
                  
                  {product.basePrice > product.price && (
                    <>
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ${product.basePrice}
                      </Typography>
                      <Chip
                        label={`Save $${product.basePrice - product.price}`}
                        color="error"
                        size="medium"
                      />
                    </>
                  )}
                </Stack>
                
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Depreciation applied: {discountPercent}% off original price
                </Typography>
              </Box>

              {/* Stock Status */}
              <Box mb={3}>
                <Typography variant="body1" gutterBottom>
                  Availability: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.stock} units available • {product.sold} units sold
                </Typography>
              </Box>

              {/* Quantity Selector */}
              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Quantity
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography variant="h6">{quantity}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    Max: {product.stock}
                  </Typography>
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  sx={{ flex: 1, py: 1.5 }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  sx={{ flex: 1, py: 1.5 }}
                >
                  Buy Now
                </Button>
              </Stack>

              {/* Features */}
              <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Stack alignItems="center" textAlign="center">
                      <LocalShipping sx={{ color: 'primary.main', mb: 1 }} />
                      <Typography variant="caption">Free Shipping</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Stack alignItems="center" textAlign="center">
                      <Shield sx={{ color: 'primary.main', mb: 1 }} />
                      <Typography variant="caption">2-Year Warranty</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Stack alignItems="center" textAlign="center">
                      <Typography variant="h6" color="primary.main" mb={1}>
                        14
                      </Typography>
                      <Typography variant="caption">Day Returns</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Stack alignItems="center" textAlign="center">
                      <Typography variant="h6" color="primary.main" mb={1}>
                        24/7
                      </Typography>
                      <Typography variant="caption">Support</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Box sx={{ width: '100%', mt: 6 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Features" />
            <Tab label="Reviews" />
          </Tabs>

          <Box sx={{ py: 4 }}>
            {tabValue === 0 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Product Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Experience the perfect blend of performance and quality with this exceptional product. 
                  Designed to meet the highest standards and deliver outstanding results.
                </Typography>
              </Box>
            )}

            {tabValue === 1 && product.specifications && (
              <Grid container spacing={3}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}

            {tabValue === 2 && product.features && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Key Features
                </Typography>
                <Grid container spacing={2}>
                  {product.features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Stack direction="row" spacing={1}>
                        <Typography color="primary.main">•</Typography>
                        <Typography>{feature}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {tabValue === 3 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Customer Reviews
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.reviews} reviews • Average rating: {product.rating}/5
                </Typography>
                {/* Reviews would go here */}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;