// CartDrawerEmpty.jsx (Make sure this is also responsive)
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";

const CartDrawerEmpty = ({ onClose }) => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    if (onClose) onClose();
    navigate("/products");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <ShoppingBagOutlinedIcon
        sx={{
          fontSize: { xs: 64, sm: 80, md: 96 },
          color: "rgba(255,255,255,0.3)",
          mb: { xs: 2, sm: 3 },
        }}
      />
      
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          color: "#FFFFFF",
          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
          mb: { xs: 1, sm: 1.5 },
        }}
      >
        Your cart is empty
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.7)",
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
          mb: { xs: 2, sm: 3 },
          maxWidth: "300px",
        }}
      >
        Add some amazing products to get started!
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2a9d8f",
          color: "#FFFFFF",
          fontWeight: 700,
          py: { xs: 1, sm: 1.25 },
          px: { xs: 3, sm: 4 },
          fontSize: { xs: '0.9rem', sm: '1rem' },
          borderRadius: '8px',
          minWidth: { xs: '180px', sm: '200px' },
          '&:hover': {
            backgroundColor: "#21867a",
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(42, 157, 143, 0.3)',
          },
          transition: 'all 0.3s ease',
        }}
        onClick={handleStartShopping}
      >
        Start Shopping
      </Button>
    </Box>
  );
};

export default CartDrawerEmpty;