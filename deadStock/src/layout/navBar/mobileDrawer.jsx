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
import { useNavigate } from "react-router-dom";
import categories from "../../component/data/categories_data";
import businessOptions from "../../component/data/business_data";

const ITEM_HEIGHT = 35;
const VISIBLE_ITEMS = 5;

const navItems = [
  { label: "Categories", submenu: categories },
  { label: "Auctions" },
  { label: "Featured Deals" },
  { label: "For Business", submenu: businessOptions.map((b) => b.label) },
];

const MobileDrawer = ({ open, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState({});
  const navigate = useNavigate();

  const toggleSubmenu = (label) => {
    setOpenSubmenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box width={280} p={2} height="100%" bgcolor="#f9f9f9ff">
        <List>
          {navItems.map((item) => (
            <Box key={item.label}>
              <ListItemButton
                onClick={() =>
                  item.submenu
                    ? toggleSubmenu(item.label)
                    : navigate("/auctions")
                }
              >
                <ListItemText primary={item.label} />
                {item.submenu &&
                  (openSubmenu[item.label] ? <ChevronUp /> : <ChevronDown />)}
              </ListItemButton>

              {/* ===== SUBMENU ===== */}
              {item.submenu && (
                <Collapse in={openSubmenu[item.label]}>
                  <Box
                    sx={{
                      maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
                      overflowY: "scroll",
                      overflowX: "hidden",

                      /* Always reserve scrollbar space */
                      scrollbarGutter: "stable",

                      /* Webkit browsers */
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#c4a0a0ff",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#145a43",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#0b3d2e",
                      },

                      scrollbarWidth: "thin",
                      // scrollbarColor: "#145a43 #eeeeee",
                    }}
                  >
                    <List disablePadding>
                      {item.submenu.map((sub) => (
                        <ListItemButton
                          key={sub}
                          sx={{ pl: 4, height: ITEM_HEIGHT }}
                        >
                          <ListItemText primary={sub} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Box>
                </Collapse>
              )}
            </Box>
          ))}

          {/* ===== AUTH BUTTON ===== */}
          <Box mt={3}>
            <Button
              fullWidth
              startIcon={<User />}
              onClick={() => {
                navigate("/auth");
                onClose();
              }}
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
