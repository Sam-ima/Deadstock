import { useState } from "react";
import { Box, Button } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import categories from "../../component/data/categories_data";
import DesktopMenu from "./desktopMenu";

const NavItems = ({ scrolled }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    {
      label: "Categories",
      submenu: Array.isArray(categories) ? categories : [],
    },
    { label: "Auction", path: "/auctions" },
    { label: "Sell Now", path: "/how-to-sell" },
  ];

  return (
    <>
      {navItems.map((item) => {
        const isActive =
          item.path && location.pathname === item.path;

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
                color: isActive
                  ? "#FFD27D"
                  : "#ffffff",
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

            {item.submenu?.length > 0 &&
              activeMenu === item.label && (
                <DesktopMenu items={item.submenu} />
              )}
          </Box>
        );
      })}
    </>
  );
};

export default NavItems;
