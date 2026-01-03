import { Avatar, Box, IconButton, Typography, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileHeader = () => {
  return (
    <Box textAlign="center" mb={4}>
      <Box position="relative" display="inline-block">
        <Avatar src="/avatar.png" sx={{ width: 120, height: 120 }} />
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "primary.main",
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>

      <Typography variant="h5" mt={2}>
        Jordan Smith
      </Typography>
      <Typography color="text.secondary">@jordankicks</Typography>

      <Chip label="VERIFIED BUYER" color="primary" sx={{ mt: 1 }} />
    </Box>
  );
};

export default ProfileHeader;
