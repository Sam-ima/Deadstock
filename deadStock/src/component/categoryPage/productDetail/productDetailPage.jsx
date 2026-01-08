// src/pages/product/ProductDetailPage.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Breadcrumbs, Link, Typography } from '@mui/material';
import products from '../../data/products';
import categories from '../../data/categories';
import { subcategories } from '../../data/subcategories';

import ProductImages from './productImages';
import ProductInfo from './productInfo';
import ProductTabs from './productTabs';

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

  return (
    <Box sx={{ 
        minHeight: '100vh', 
        pt: { xs: '30px', sm: '35px', md: '40px' }, 
        // bgcolor: 'background.default',
        // backgroundColor:"red"
         }}>
      {/* Breadcrumbs */}
      {/* <Container maxWidth="xl" sx={{ py: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer', mr: 1 }}
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate(`/category/${category?.slug}`)}
          sx={{ cursor: 'pointer', mr: 1 }}
        >
          {category?.name}
        </Link>
        {subcategory && (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(`/category/${category?.slug}`)}
            sx={{ cursor: 'pointer', mr: 1 }}
          >
            {subcategory.name}
          </Link>
        )}
        <Typography color="text.primary" sx={{ display: 'inline' }}>
          {product.name}
        </Typography>
      </Container> */}

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box display={{ xs: 'block', md: 'flex' }} gap={4}>
          {/* Left: Images */}
          <ProductImages
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />

          {/* Right: Info */}
          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </Box>

        {/* Tabs */}
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
