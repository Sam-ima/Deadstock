import { Box, Typography, Button } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";

const CartDrawerEmpty = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 5, p: 3 }}>
      <ShoppingBagIcon sx={{ fontSize: 64, color: "rgba(255,255,255,0.5)" }} />
      <Typography variant="h6" sx={{ color: "#FFF", mb: 2 }}>
        Please Login
      </Typography>
      <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}>
        You need to be logged in to view and manage your cart.
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#2a9d8f" }}
        onClick={() => {
          onClose();
          navigate("/login", {
            state: { redirectTo: window.location.pathname },
          });
        }}
      >
        Login to Continue
      </Button>
    </Box>
  );
};

export default CartDrawerEmpty;
