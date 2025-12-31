import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../component/nav_bar";

const MainLayout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet /> {/* Page content goes here */}
    </Box>
  );
};

export default MainLayout;
