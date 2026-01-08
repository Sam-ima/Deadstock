import { useState } from "react";
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({ product, quantity }) => {
  const navigate = useNavigate();
  
  // State for the popup message
  const [openPopup, setOpenPopup] = useState(false);

  const handleAddToCart = () => {
    // 1. SAVE THE DATA
    // If using a simple app, you can save to localStorage:
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    currentCart.push({ ...product, quantity });
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // 2. SHOW POPUP
    setOpenPopup(true);

    // 3. OPTIONAL: Navigate after a short delay
    // setTimeout(() => navigate("/cart"), 1500);
  };

  const handleClosePopup = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenPopup(false);
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCart />}
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        sx={{ flex: 1, backgroundColor: "#2e7d32" }} // Green for success
      >
        Add to Cart
      </Button>

      {/* SUCCESS POPUP MESSAGE */}
      <Snackbar 
        open={openPopup} 
        autoHideDuration={3000} 
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClosePopup} severity="success" sx={{ width: '100%' }}>
          {product.name} successfully added to cart!
        </Alert>
      </Snackbar>

      <Button
        variant="outlined"
        size="large"
        onClick={() => navigate("/checkout", { state: { product, quantity } })}
        disabled={product.stock === 0}
        sx={{ flex: 1 }}
      >
        Buy Now
      </Button>
    </Stack>
  );
};

export default ActionButtons;