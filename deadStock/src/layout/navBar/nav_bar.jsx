import { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/deadstock_logo.png";
import NavItems from "./navbarItems";
import ActionIcons from "./actionIcons";
import MobileDrawer from "./mobileDrawer";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          backgroundColor: scrolled ? "#ffffff" : "transparent",
          color: scrolled ? "#1a1a1a" : "#ffffff",
          transition: "all 0.3s ease",
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
                sx={{ height: 36 }}
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
                <NavItems />
              </Box>
            )}

            {/* RIGHT: Action Icons */}
            <Box sx={{ minWidth: 120, display: "flex", justifyContent: "flex-end" }}>
              <ActionIcons
                isMobile={isMobile}
                onMenuClick={() => setDrawerOpen(true)}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
