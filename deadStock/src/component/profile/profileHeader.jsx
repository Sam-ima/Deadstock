import { Avatar, Box, Typography, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const BuyerHeader = () => {
  return (
    <Box textAlign="center" mt={2}>
      <Box position="relative" display="inline-block">
        <Avatar
          src="/avatar.png"
          sx={{ width: 120, height: 120 }}
        />

        <IconButton
          sx={{
            position: "absolute",
            bottom: 6,
            right: 6,
            bgcolor: "#22C55E",
            color: "white",
            "&:hover": { bgcolor: "#16A34A" },
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
        label="VERIFIED BUYER"
        color="success"
        sx={{ mt: 2, px: 2 }}
      />
    </Box>
  );
};

export default BuyerHeader;
