import { Avatar, Box, Chip, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileHeader = ({ name, username, verifiedLabel }) => {
  return (
    <Box textAlign="center" mb={4}>
      <Box position="relative" display="inline-block">
        <Avatar
          src="/avatar.png"
          sx={{ width: 90, height: 90, mx: "auto" }}
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "primary.main",
            color: "#fff",
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="h6" mt={2}>
        {name}
      </Typography>
      <Typography color="text.secondary">@{username}</Typography>

      <Chip
        label={verifiedLabel}
        color="primary"
        sx={{ mt: 1, px: 2 }}
      />
    </Box>
  );
};

export default ProfileHeader;
