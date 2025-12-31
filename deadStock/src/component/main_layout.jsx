import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../component/nav_bar";
import Footer from "../component/footer";

const MainLayout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box flex="1">
        <Outlet /> {/* Page content goes here */}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
