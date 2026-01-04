import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import categories from "../../component/data/categories_data";
import businessOptions from "../../component/data/business_data";
import DesktopMenu from "./desktopMenu";

const navItems = [
  { label: "Home" },
  { label: "Categories", submenu: categories },
  { label: "Auction" },
  { label: "For Business", submenu: businessOptions.map((b) => b.label) },
];

const NavItems = ({ scrolled }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      {navItems.map((item) => (
        <Box
          key={item.label}
          sx={{ position: "relative" }}
          onMouseEnter={() => item.submenu && setActiveMenu(item.label)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Button
            endIcon={item.submenu ? <ChevronDown size={14} /> : null}
            onClick={() =>
              item.label === "Auctions" && navigate("/auctions")
            }
            sx={{
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#ffffff",
              px: 1,
              py: 1.5,
              minHeight: 48,
              borderRadius: 0,
              whiteSpace: "nowrap",
              transition: "color 0.3s ease",
              "&:hover": {
                backgroundColor: "transparent",
                color: scrolled ? "#000" : "#FFD27D",
              },
            }}
          >
            {item.label}
          </Button>

          {item.submenu && activeMenu === item.label && (
            <DesktopMenu items={item.submenu} scrolled={scrolled} />
          )}
        </Box>
      ))}
    </>
  );
};

export default NavItems;
