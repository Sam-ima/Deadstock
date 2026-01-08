import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import Header from "../component/cart/cartHeader";
import CartNotification from "../component/cart/cartNotification";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#FF6B35", light: "#FF9E6D", dark: "#E55A2B" },
    secondary: { main: "#4CAF50", light: "#81C784", dark: "#388E3C" },
    warning: { main: "#FFC107", light: "#FFD54F", dark: "#FFA000" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
});

const AddToCart = () => {
  const location = useLocation();
  const { product, quantity = 1 } = location.state || {}; // 🔑 get product from navigate

  const [cartOpen, setCartOpen] = useState(!!product);
  const [lastAddedProduct, setLastAddedProduct] = useState(product || null);

  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <h2>No product selected!</h2>
      </Box>
    );
  }

  const handleCloseCart = () => setCartOpen(false);

  const handleContinueShopping = () => setCartOpen(false);

  const handleCheckout = () => {
    setCartOpen(false);
    alert(`Proceeding to checkout for ${quantity} x ${product.name}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header />

        <Container maxWidth="sm" sx={{ py: 8 }}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>
            Price: <b>${product.price}</b> | Quantity: <b>{quantity}</b>
          </p>
        </Container>

        <CartNotification
          open={cartOpen}
          product={lastAddedProduct}
          quantity={quantity}
          onClose={handleCloseCart}
          onContinueShopping={handleContinueShopping}
          onCheckout={handleCheckout}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AddToCart;
