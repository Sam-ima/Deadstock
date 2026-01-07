import { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Button,
} from "@mui/material";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import categories from "../../component/data/categories_data";

const ITEM_HEIGHT = 35;
const VISIBLE_ITEMS = 5;

const navItems = [
  { label: "Home", path: "/" },
  { label: "Categories", submenu: categories },
  { label: "Auctions", path: "/auctions" },
  { label: "Sell Now", path: "/how-to-sell" },
];

const MobileDrawer = ({ open, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSubmenu = (label) => {
    setOpenSubmenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box width={280} p={2} height="100%" bgcolor="#f9f9f9ff">
        <List>
          {navItems.map((item) => {
            const isActive = item.path && location.pathname === item.path;

            return (
              <Box key={item.label}>
                <ListItemButton
                  onClick={() =>
                    item.submenu
                      ? toggleSubmenu(item.label)
                      : handleNavigation(item.path)
                  }
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    backgroundColor: isActive
                      ? "rgba(20,90,67,0.12)"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(20,90,67,0.18)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#145a43" : "inherit",
                    }}
                  />
                  {item.submenu &&
                    (openSubmenu[item.label] ? <ChevronUp /> : <ChevronDown />)}
                </ListItemButton>

                {/* ===== SUBMENU ===== */}
                {item.submenu && (
                  <Collapse in={openSubmenu[item.label]}>
                    <Box
                      sx={{
                        maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
                        overflowY: "auto",
                      }}
                    >
                      <List disablePadding>
                        {item.submenu.map((sub) => (
                          <ListItemButton
                            key={sub}
                            sx={{
                              pl: 4,
                              height: ITEM_HEIGHT,
                            }}
                          >
                            <ListItemText primary={sub} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Box>
                  </Collapse>
                )}
              </Box>
            );
          })}

          {/* ===== AUTH BUTTON ===== */}
          <Box mt={3}>
            <Button
              fullWidth
              startIcon={<User />}
              onClick={() => handleNavigation("/auth")}
              sx={{
                borderRadius: "24px",
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg, #0b3d2e, #145a43)",
                color: "#fff",
                py: 1.2,
              }}
            >
              Login / Register
            </Button>
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
