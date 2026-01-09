import {
  Avatar,
  Box,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileHeader = () => {
  return (
    <Box textAlign="center" mt={2}>
      <Box position="relative" display="inline-block">
        <Avatar
          src="/avatar.png"
          sx={{
            width: 120,
            height: 120,
            border: "4px solid #22C55E",
          }}
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: 4,
            right: 4,
            bgcolor: "#FF7A00",
            color: "white",
            "&:hover": { bgcolor: "#e66a00" },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="h5" fontWeight={700} mt={2}>
        Jordan Smith
      </Typography>
      <Typography color="text.secondary">@jordankicks</Typography>

      <Chip
        label="VERIFIED SELLER"
        color="success"
        sx={{ mt: 1, px: 2 }}
      />

      {/* Stats */}
      <Box
        display="flex"
        justifyContent="space-around"
        mt={3}
      >
        {[
          { label: "Selling", value: 24 },
          { label: "Sold", value: 158 },
          { label: "Rating", value: 4.9 },
        ].map((item) => (
          <Box key={item.label} textAlign="center">
            <Typography fontWeight={700}>
              {item.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileHeader;
