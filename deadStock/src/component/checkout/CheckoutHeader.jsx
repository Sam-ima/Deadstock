import { Box, Typography } from "@mui/material";
import { colors } from "./Constants";

export default function CheckoutHeader({ isDirect, itemCount }) {
  return (
    <Box textAlign="center" mb={4}>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{
          background: colors.primaryGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {isDirect ? "Direct Purchase" : "Secure Checkout"}
      </Typography>

      <Typography color={colors.textSecondary} mt={1}>
        {isDirect
          ? "Complete your purchase below"
          : `Checkout ${itemCount} item(s)`}
      </Typography>
    </Box>
  );
}
