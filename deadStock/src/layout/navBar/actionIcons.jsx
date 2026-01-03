import { Box, IconButton, Button, Badge } from "@mui/material";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

const ActionIcons = ({ isMobile, onMenuClick }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton color="inherit">
        <Search size={20} />
      </IconButton>

      <IconButton color="inherit">
        <Badge badgeContent={3} color="warning">
          <ShoppingCart size={20} />
        </Badge>
      </IconButton>

      {!isMobile && (
        <Button
          startIcon={<User size={18} />}
          sx={{
            ml: 1,
            px: 3,
            py: 1,
            borderRadius: "24px",
            textTransform: "none",
            fontWeight: 600,
            background: "linear-gradient(135deg, #0b3d2e, #145a43)",
            color: "#fff",
          }}
        >
          Login / Register
        </Button>
      )}

      {isMobile && (
        <IconButton color="inherit" onClick={onMenuClick}>
          <Menu />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionIcons;
