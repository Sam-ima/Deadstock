import { Box, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SettingsRow = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 2,
        mt: 3,
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.05)",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <SettingsIcon />
        <Typography fontWeight={500}>Settings</Typography>
      </Box>

      <ChevronRightIcon />
    </Box>
  );
};

export default SettingsRow;
