import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext";
import { toast } from "react-toastify";

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
        // backgroundColor:'red',
        textAlign: "center",
        py: { xs: 3, sm: 4, md: 5 },
        px: 2,
      }}
    >
      <Typography variant="h3" fontWeight={700} color="#bd6213ff"
        sx={{
          fontSize: {
            xs: "24px",   // mobile
            sm: "28px",   // small tablets
            md: "32px",   // tablets / small laptop
            lg: "40px",   // desktop
            xl: "48px",   // large screens
          },
        }}>
        Selling Made{" "}
        <Box component="span" color="#0B2A1E">
          Simple
        </Box>
      </Typography>
      <Typography
        variant="body1"
        sx={{ maxWidth: 600, mx: "auto", mt: 2, opacity: 0.9,fontSize: {
            xs: "16px",   // mobile
            // sm: "18px",   // small tablets
            md: "18px",   // tablets / small laptop
            // lg: "18px",   // desktop
            xl: "20px",   // large screens
          } }}
      >
        Turn your deadstock into cash in just a few steps. Whether you're an
        individual or a business, we make it easy to clear your inventory.
      </Typography>

      <Button
        onClick={handleSellNow}
        size="large"
        sx={{
          mt: {xs:3 , md:4},
          px: {xs:3 , md:4},
          py: {xs:1.2 , md:1.4},
          borderRadius: 6,
          bgcolor: "#10562bff",
          color: "#fff",
          fontWeight: 600,
          "&:hover": { bgcolor: "#EF6C00", color: "#000" },
        }}
      >
        Sell Now
      </Button>
    </Box>
  );
};

export default HeroSection;
