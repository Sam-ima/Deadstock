import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Button,
  Badge,
  InputBase,
  Paper,
} from "@mui/material";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

const ActionIcons = ({ isMobile, onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {/* Search Bar (Desktop Only) */}

      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1,
          height: 38,
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s ease",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.25)",
          },
        }}
      >
        <Search size={16} />
        <InputBase
          placeholder="Search products..."
          sx={{
            ml: 1,
            color: "#fff",
            fontSize: "0.9rem",
            width: { xs: 100, sm: 180, md: 100,lg:200 },
          }}
        />
      </Paper>

      {/* Cart */}
      <IconButton 
        color="inherit" 
        onClick={() => navigate("/cart")} 
      >
        <Badge badgeContent={3} color="warning">
          <ShoppingCart size={20} />
        </Badge>
      </IconButton>

      {/* Login Button */}
      {!isMobile && (
        <Button
          startIcon={<User size={15} />}
          onClick={() => navigate("/auth")}
          sx={{
            ml: 0,
            px: 1,
            py: 1,
            borderRadius: "24px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#F57C00",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#EF6C00",
            },
          }}
        >
          Login/Register
        </Button>
      )}

      {/* Mobile Menu Icon */}
      {isMobile && (
        <IconButton color="inherit" onClick={onMenuClick}>
          <Menu />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionIcons;
