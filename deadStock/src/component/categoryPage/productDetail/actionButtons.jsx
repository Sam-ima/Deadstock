import { Stack, Button } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({ product, quantity }) => {
  const navigate = useNavigate(); // 🔑 react-router-dom hook

  const handleAddToCart = () => {
    // Navigate to the AddToCart page
    navigate("/add-to-cart", {
      state: { product, quantity }, // Pass product and quantity via location state
    });
  };

  const handleBuyNow = () => {
    // Could navigate to checkout page
    navigate("/checkout", {
      state: { product, quantity },
    });
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCart />}
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        sx={{ flex: 1 }}
      >
        Add to Cart
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={handleBuyNow}
        disabled={product.stock === 0}
        sx={{ flex: 1 }}
      >
        Buy Now
      </Button>
    </Stack>
  );
};

export default ActionButtons;
