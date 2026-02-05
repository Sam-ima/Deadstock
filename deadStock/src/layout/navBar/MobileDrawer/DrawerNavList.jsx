import { useState, useEffect } from "react";
import { Box, List, Divider } from "@mui/material";
import { Home, Gavel, Store, Tag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategories } from "../../../context/categoryContext";
import DrawerNavItem from "./DrawerNavItems";

const DrawerNavList = ({ onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { categories = [] } = useCategories();

  const navItems = [
    { label: "Home", path: "/", icon: <Home size={18} /> },
    { label: "Categories", submenu: categories, icon: <Tag size={18} /> },
    { label: "Auctions", path: "/auctions", icon: <Gavel size={18} /> },
    { label: "Sell an item", path: "/how-to-sell", icon: <Store size={18} /> },
  ];

  useEffect(() => {
    if (location.pathname.startsWith("/category")) {
      setOpenSubmenu({ Categories: true });
    }
  }, [location.pathname]);

  const toggleSubmenu = (label) =>
    setOpenSubmenu((prev) => ({ ...prev, [label]: !prev[label] }));

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleSubmenuNavigation = (slug) => {
    navigate(`/category/${slug}`);
    onClose();
  };

  return (
    <Box p={2} flex={1} overflow="auto">
      <List>
        {navItems.map((item) => (
          <DrawerNavItem
            key={item.label}
            item={item}
            open={openSubmenu[item.label]}
            isActive={item.path === location.pathname}
            onToggle={() => toggleSubmenu(item.label)}
            onNavigate={handleNavigation}
            onSubNavigate={handleSubmenuNavigation}
          />
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default DrawerNavList;
