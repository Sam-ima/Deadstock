import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import DesktopMenu from "./desktopMenu";
import { useCategories } from "../../context/categoryContext";

const NavItems = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, loading, error } = useCategories();

  const navItems = [
    { label: "Home", path: "/" },
    {
      label: "Categories",
      submenu: categories || [], // ✅ Array of Firestore objects
    },
    { label: "Auction", path: "/auctions" },
    { label: "Sell an item", path: "/how-to-sell" },
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <Typography>Loading categories...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 2 }}>
        <Typography color="error">Failed to load categories</Typography>
      </Box>
    );
  }

  return (
    <>
      {navItems.map((item) => {
        const isActive = item.path && location.pathname === item.path;

        return (
          <Box
            key={item.label}
            sx={{ position: "relative" }}
            onMouseEnter={() =>
              item.submenu?.length && setActiveMenu(item.label)
            }
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Button
              endIcon={item.submenu?.length ? <ChevronDown size={14} /> : null}
              onClick={() => item.path && navigate(item.path)}
              sx={{
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 700,
                px: 1,
                py: 1.5,
                minHeight: 48,
                borderRadius: 0,
                whiteSpace: "nowrap",
                color: isActive ? "#FFD27D" : "#ffffff",
                borderBottom: isActive
                  ? "2px solid #FFD27D"
                  : "2px solid transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#FFD27D",
                },
              }}
            >
              {item.label}
            </Button>

            {item.submenu?.length > 0 && activeMenu === item.label && (
              <DesktopMenu
                items={item.submenu}
                onItemClick={(slug) => navigate(`/category/${slug}`)}
              />
            )}
          </Box>
        );
      })}
    </>
  );
};

export default NavItems;
