import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0b1a1f",
      paper: "#10262c",
    },
    primary: {
      main: "#00e5ff",
    },
    success: {
      main: "#2ecc71",
    },
    warning: {
      main: "#f1c40f",
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default darkTheme;
