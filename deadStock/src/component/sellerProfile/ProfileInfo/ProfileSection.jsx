import { Box, Typography, IconButton, Divider, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const ProfileSection = ({ title, isEditing, onEditToggle, children }) => {
  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ color: "#c15c3a", fontWeight: 600 }}>
          {title}
        </Typography>

        <IconButton
          size="small"
          color={isEditing ? "error" : "primary"}
          onClick={onEditToggle}
        >
          {isEditing ? <CancelIcon /> : <EditIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ my: 1.5 }} />
      {children}
    </Paper>
  );
};

export default ProfileSection;
