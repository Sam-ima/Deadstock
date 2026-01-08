import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import ProductCard from './components/ProductCard';
import CartNotification from './components/CartNotification';
import Header from './components/Header';
import ProductsGrid from './components/ProductsGrid';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // Orange
      light: '#FF9E6D',
      dark: '#E55A2B',
    },
    secondary: {
      main: '#4CAF50', // Green
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FFC107', // Yellow
      light: '#FFD54F',
      dark: '#FFA000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const AddToCart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Premium Laptop",
      description: "High-performance business laptop with 16GB RAM",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-400",
      category: "Audio"
    },
    {
      id: 3,
      name: "Ergonomic Chair",
      description: "Professional office chair with lumbar support",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      category: "Office"
    },
    {
      id: 4,
      name: "Smart Watch",
      description: "Fitness tracker with heart rate monitor",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      category: "Wearables"
    },
  ];

  const handleAddToCart = (product) => {
    setLastAddedProduct(product);
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handleContinueShopping = () => {
    setCartOpen(false);
    // In a real app, you might navigate to products page
  };

  const handleCheckout = () => {
    setCartOpen(false);
    // In a real app, you might navigate to checkout page
    alert('Proceeding to checkout...');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <ProductsGrid 
            products={products} 
            onAddToCart={handleAddToCart} 
          />
        </Container>

        <CartNotification
          open={cartOpen}
          product={lastAddedProduct}
          onClose={handleCloseCart}
          onContinueShopping={handleContinueShopping}
          onCheckout={handleCheckout}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AddToCart;