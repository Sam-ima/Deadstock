import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import this
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrapper 1: Routing */}
      <ThemeProvider theme={theme}> {/* Wrapper 2: MUI Styling */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);