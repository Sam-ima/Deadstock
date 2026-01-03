import  { useState } from "react";
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
      <Box width={280} p={2} height="100%" bgcolor="#f9f9f9">
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

              {item.submenu && (
                <Collapse in={openSubmenu[item.label]}>
                  <List disablePadding>
                    {item.submenu.map((sub) => (
                      <ListItemButton key={sub} sx={{ pl: 4 }}>
                        <ListItemText primary={sub} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}

          <Box mt={3}>
            <Button
              fullWidth
              startIcon={<User />}
              sx={{
                borderRadius: "24px",
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg, #0b3d2e, #145a43)",
                color: "#fff",
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
