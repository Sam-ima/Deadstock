import { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/deadstock_logo.png";
import NavItems from "./navbarItems";
import ActionIcons from "./actionIcons";
import MobileDrawer from "./MobileDrawer/mobileDrawer";
import CartDrawer from "../../pages/cart.page";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // 🛒
  const [mobileOpen, setMobileOpen] = useState(false); // 📱

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        elevation={scrolled ? 2 : 0}
        sx={{
          backgroundColor: "#194638ff",
          color: "#ffffff",
          transition: "all 0.3s ease",
          position: "fixed",
          width: "100%",
         zIndex: (theme) => theme.zIndex.appBar,

        }}
      >
        <Toolbar disableGutters>
          {/* CENTERED CONTAINER */}
          <Box
            sx={{
              maxWidth: "lg",
              mx: "auto",
              px: { xs: 2, sm: 3, md: 4 },
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* LEFT: Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                minWidth: 120,
              }}
              onClick={() => navigate("/")}
            >
              <Box
                component="img"
                src={logo}
                alt="Deadstock"
                sx={{ height: 50, width: 50, borderRadius: "50%" }}
              />
            </Box>

            {/* CENTER: Nav Items (Desktop only) */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <NavItems scrolled={scrolled} />
              </Box>
            )}

            {/* RIGHT: Action Icons */}
            <Box
              sx={{
                minWidth: 120,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ActionIcons
                isMobile={isMobile}
                onMenuClick={() => setMobileOpen(true)} // 📱
                onCartClick={() => setCartOpen(true)} // 🛒
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* 🛒 CART DRAWER */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* 📱 MOBILE MENU DRAWER */}
      {isMobile && (
        <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
