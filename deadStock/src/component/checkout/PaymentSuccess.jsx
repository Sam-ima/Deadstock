import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colors } from "./Constants";

export default function PaymentSuccess({ email }) {
  return (
    <Box textAlign="center" py={6}>
      <CheckCircleIcon sx={{ fontSize: 80, color: colors.success }} />
      <Typography variant="h4" fontWeight={700} mt={2}>
        Payment Successful 🎉
      </Typography>
      <Typography color={colors.textSecondary}>
        Confirmation sent to {email}
      </Typography>

      <Button
        sx={{
          mt: 4,
          background: colors.primaryGradient,
          color: colors.textLight,
        }}
        onClick={() => (window.location.href = "/")}
      >
        Continue Shopping
      </Button>
    </Box>
  );
}
