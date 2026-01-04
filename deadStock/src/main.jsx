import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import this
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import Theme from './theme.jsx';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrapper 1: Routing */}
      <ThemeProvider theme={Theme}> {/* Wrapper 2: MUI Styling */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);