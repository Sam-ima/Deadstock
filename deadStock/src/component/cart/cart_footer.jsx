// CartDrawerFooter.jsx
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "./cart_utils";

const CartDrawerFooter = ({ cartTotal = 0, onCheckout }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (onCheckout) onCheckout();
    navigate("/checkout");
  };

  return (
    <Box 
      sx={{
        p: 3,
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <Divider 
        sx={{ 
          mb: { xs: 1.5, sm: 2 }, 
          borderColor: "rgba(255,255,255,0.2)" 
        }} 
      />

      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        mb={{ xs: 1.5, sm: 2 }}
      >
        <Typography 
          variant="h6" 
          fontWeight={800} 
          // color="#FFF"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Total:
        </Typography>
        <Typography 
          variant="h6" 
          fontWeight={800} 
          // color="#FFF"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Rs. {formatPrice(cartTotal)}
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        startIcon={<ShoppingCartCheckoutIcon />}
        sx={{
          backgroundColor: "#16A34A",
          fontWeight: 700,
          py: { xs: 1.25, sm: 1.5 },
          fontSize: { xs: '0.9rem', sm: '1rem' },
          minHeight: { xs: '48px', sm: '56px' },
          borderRadius: { xs: '8px', sm: '10px' },
          "&:hover": { 
            backgroundColor: "#15803D",
            transform: { xs: 'none', sm: 'translateY(-2px)' },
            boxShadow: { xs: 'none', sm: '0 4px 12px rgba(42, 157, 143, 0.3)' },
          },
          transition: 'all 0.3s ease',
        }}
        onClick={handleCheckout}
      >
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
          Checkout 
        </Box>
        {/* Rs. {formatPrice(cartTotal)} */}
      </Button>

      {/* Mobile-only note */}
      <Typography
        variant="caption"
        sx={{
          display: { xs: 'block', sm: 'none' },
          textAlign: 'center',
          mt: 1,
          // color: 'rgba(255,255,255,0.6)',
          fontSize: '0.75rem',
        }}
      >
        Swipe down or tap outside to close
      </Typography>
    </Box>
  );
};

export default CartDrawerFooter;