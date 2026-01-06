import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    primary: {
      main: "#000000",
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default lightTheme;
