import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const logoutRow = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 2,
        mt: 2,
        borderRadius: 3,
        bgcolor: "rgba(255,0,0,0.08)",
        color: "#ff6b6b",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "rgba(255,0,0,0.15)",
        },
      }}
    >
      <LogoutIcon />
      <Typography fontWeight={600}>Logout</Typography>
    </Box>
  );
};

export default logoutRow;
