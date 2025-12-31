import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logo from "../assets/deadstock_logo.png";
import categories from "../component/data/categories_data";
import businessOptions from "../component/data/business_data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [anchorCat, setAnchorCat] = useState(null);
  const [anchorBiz, setAnchorBiz] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSubmenuOpen, setDrawerSubmenuOpen] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Categories", submenu: categories },
    { label: "Auctions" },
    { label: "Featured Deals" },
    { label: "For Business", submenu: businessOptions.map((opt) => opt.label) },
  ];

  const toggleDrawerSubmenu = (label) => {
    setDrawerSubmenuOpen((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      <AppBar
        elevation={scrolled ? 3 : 0}
        sx={{
          background: scrolled ? "#ffffff" : "transparent",
          color: scrolled ? "#1a1a1a" : "#fff",
          transition: "all 0.3s ease",
          px: 2,
        }}
      >
        <Toolbar sx={{ maxWidth: "lg", mx: "auto", width: "100%" }}>
          {/* LEFT */}
          <Box display="flex" alignItems="center" flexGrow={1} gap={3}>
            <img src={logo} alt="Deadstock" height={36} />

            {!isMobile &&
              navItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{ position: "relative" }}
                  onMouseEnter={() => item.submenu && setAnchorCat(item.label)}
                  onMouseLeave={() => setAnchorCat(null)}
                >
                  <Button
                    endIcon={item.submenu ? <ChevronDown size={16} /> : null}
                    sx={{ color: "inherit", textTransform: "none" }}
                    onClick={() => {
                      if (item.label === "Auctions") {
                        navigate("/auctions");
                      }
                    }}
                  >
                    {item.label}
                  </Button>

                  {/* Desktop Submenu */}
                  {item.submenu && anchorCat === item.label && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        background: "#fff",
                        color: "#000",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: 1,
                        minWidth: 180,
                        zIndex: 99,
                        py: 1,
                      }}
                    >
                      {item.submenu.map((sub) => (
                        <Button
                          key={sub}
                          fullWidth
                          sx={{
                            justifyContent: "flex-start",
                            px: 2,
                            py: 1,
                            color: "#000",
                            textTransform: "none",
                            "&:hover": { background: "#f0f0f0" },
                          }}
                        >
                          {sub}
                        </Button>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
          </Box>

          {/* RIGHT */}
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
                  background: "linear-gradient(135deg, #0b3d2e 0%, #145a43 100%)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(135deg, #145a43 0%, #0b3d2e 100%)",
                  },
                }}
              >
                Login / Register
              </Button>
            )}

            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          width={280}
          role="presentation"
          sx={{
            p: 2,
            background: "#f9f9f9",
            height: "100%",
          }}
        >
          <List>
            {navItems.map((item) => (
              <Box key={item.label}>
                <ListItemButton
                   onClick={() => {
                    if (item.label === "Auctions") {
                      navigate("/auctions");
                      setDrawerOpen(false);
                    } else if (item.submenu) {
                      toggleDrawerSubmenu(item.label);
                    }
                  }}
                >
                  <ListItemText primary={item.label} />
                  {item.submenu &&
                    (drawerSubmenuOpen[item.label] ? <ChevronUp /> : <ChevronDown />)}
                </ListItemButton>

                {item.submenu && (
                  <Collapse in={drawerSubmenuOpen[item.label]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu.map((sub) => (
                        <ListItemButton
                          key={sub}
                          sx={{
                            pl: 4,
                            borderRadius: 1,
                            my: 0.5,
                            "&:hover": { background: "#e0f7f1" },
                          }}
                        >
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
                startIcon={<User size={18} />}
                fullWidth
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: "24px",
                  textTransform: "none",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #0b3d2e 0%, #145a43 100%)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(135deg, #145a43 0%, #0b3d2e 100%)",
                  },
                }}
              >
                Login / Register
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
