import { Box, Paper } from "@mui/material";

const AuthContainer = ({ children }) => {
  return (
    <Box
      sx={{
        width:"100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(135deg, #E8F5E9, #FFFFFF, #FFF3E0)",
        p: 2,
        mt:2
      }}
    >
      <Paper elevation={10} sx={{ width: 420, borderRadius: 4, p: 4,bgcolor:"#f8f4edff" }}>
        {children}
      </Paper>
    </Box>
  );
};

export default AuthContainer;
