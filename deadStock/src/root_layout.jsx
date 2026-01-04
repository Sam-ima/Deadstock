// import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./layout/navBar/nav_bar";
import FooterBar from "./layout/footer/footer";
function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <FooterBar />
    </>
  );
}

export default RootLayout;