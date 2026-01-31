// components/checkout/PaymentSuccess.jsx
import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colors } from "../Constants";

const PaymentSuccess = ({ userEmail, orderId }) => {
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
            color={colors.success}
            gutterBottom
          >
            Payment Successful! 🎉
          </Typography>
          
          <Typography
            variant="body1"
            color={colors.textSecondary}
            sx={{ mb: 3, maxWidth: 500, mx: "auto" }}
          >
            Your order has been confirmed and is being processed. A confirmation email has been sent to{" "}
            <strong>{userEmail || "your email"}</strong>
          </Typography>
          
          {orderId && (
            <Typography
              variant="caption"
              color={colors.textSecondary}
              sx={{
                display: "inline-block",
                bgcolor: colors.bgDark,
                px: 2,
                py: 1,
                borderRadius: 1,
                mb: 4,
              }}
            >
              Order ID: {orderId}
            </Typography>
          )}
          
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              onClick={() => (window.location.href = "/orders")}
              sx={{
                background: colors.primaryGradient,
                color: colors.textLight,
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              View Order
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/")}
              sx={{
                borderColor: colors.border,
                color: colors.textPrimary,
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                '&:hover': {
                  borderColor: colors.primary,
                  bgcolor: colors.bgLight,
                }
              }}
            >
              Continue Shopping
            </Button>
          </Stack>
          
          <Typography
            variant="caption"
            color={colors.textSecondary}
            sx={{ mt: 4, display: "block" }}
          >
            You will receive tracking information once your order ships.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentSuccess;