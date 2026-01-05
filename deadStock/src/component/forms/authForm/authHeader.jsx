import { Box, Typography, Avatar } from "@mui/material";
// import EcoIcon from "@mui/icons-material/Eco";

export const AuthHeader = () => {
  return (
    <Box textAlign="center" mb={3}>
      <Avatar
        sx={{
          mx: "auto",
          mb: 1,
          bgcolor: "#E8F5E9",
          color: "#2E7D32",
          width: 56,
          height: 56,
        }}
      >
        {/* <EcoIcon /> */}
      </Avatar>
      <Typography variant="h5" fontWeight={700} color="#2E7D32">
        Deadstock Marketplace
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Liquidate excess inventory • Buy smarter • Bid transparently
      </Typography>
    </Box>
  );
};
