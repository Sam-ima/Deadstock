import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fafafa",
      second:"#FF6F1E", // Note: 'second' is not standard, it's custom.
    },
    secondary: {
      main: "#c2c2c2",
    },
    info: {
      main: "#CA101E",
    },
    warning: {
      main: "#ced127",
    },
    error: {
      main: "#ec4034",
    },
    accent: {
      main: "#000000", // Custom color for accentMain
      secondary: "#ffffff", // Custom color for accentSecondary
    },
  },
  typography: {
    fontFamily: "Roboto Serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: 'black',  // Default label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#f60c69',  // Focused label color
          },
        },
      },
    },
  },
});

export default theme;