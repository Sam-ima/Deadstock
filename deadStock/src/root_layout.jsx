import { Outlet } from "react-router-dom";
import NavBar from "./layout/navBar/nav_bar";
import FooterBar from "./layout/footer/footer";

function RootLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // full viewport height
      }}
    >
      <NavBar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <FooterBar />
    </div>
  );
}

export default RootLayout;
