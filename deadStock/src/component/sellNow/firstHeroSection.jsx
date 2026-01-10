import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext";
import {toast} from "react-toastify";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // from AuthContext

  const handleSellNow = () => {
    if (user) {
      navigate("/sell-item");
    } else {
      toast.error("Please register or log in to add items for sale.");
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 5, md: 5 },
        px: 2,
      }}
    >
      <Typography variant="h3" fontWeight={700} color="#bd6213ff">
        Selling Made{" "}
        <Box component="span" color="#0B2A1E">
          Simple
        </Box>
      </Typography>

      <Typography
        variant="body1"
        sx={{ maxWidth: 600, mx: "auto", mt: 2, opacity: 0.9 }}
      >
        Turn your deadstock into cash in just a few steps. Whether you're an
        individual or a business, we make it easy to clear your inventory.
      </Typography>

      <Button
        onClick={handleSellNow}
        size="large"
        sx={{
          mt: 4,
          px: 4,
          py: 1.4,
          borderRadius: 6,
          bgcolor: "#10562bff",
          color: "#fff",
          fontWeight: 700,
          "&:hover": { bgcolor: "#EF6C00", color: "#000" },
        }}
      >
        Sell Now
      </Button>
    </Box>
  );
};

export default HeroSection;
