// components/checkout/PaymentSuccess.jsx
import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colors } from "./Constants";

const PaymentSuccess = ({ userEmail }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg,
        color: colors.textPrimary,
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", py: 6 }}>
          <CheckCircleIcon
            sx={{ fontSize: 80, color: colors.success, mb: 3 }}
          />
          <Typography
            variant="h4"
            fontWeight={700}
            color={colors.textPrimary}
            gutterBottom
          >
            Payment Successful! 🎉
          </Typography>
          <Typography
            variant="body1"
            color={colors.textSecondary}
            sx={{ mb: 4, maxWidth: 500, mx: "auto" }}
          >
            Your order has been confirmed. A confirmation email has been sent to{" "}
            {userEmail || "your email"}
          </Typography>
          <Button
            variant="contained"
            onClick={() => (window.location.href = "/")}
            sx={{
              background: colors.primaryGradient,
              color: colors.textLight,
              px: 5,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentSuccess;
