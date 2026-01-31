import { Box, Container, Typography, Button, Stack } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { colors } from "../Constants";

const PaymentFailure = ({ errorMessage, orderId }) => {
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
          <ErrorIcon sx={{ fontSize: 80, color: colors.error, mb: 3 }} />
          <Typography
            variant="h4"
            fontWeight={700}
            color={colors.error}
            gutterBottom
          >
            Payment Failed! 😕
          </Typography>
          
          <Typography
            variant="body1"
            color={colors.textSecondary}
            sx={{ mb: 3, maxWidth: 500, mx: "auto" }}
          >
            {errorMessage || "We couldn't process your payment. Please try again."}
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
              onClick={() => (window.location.href = "/checkout")}
              sx={{
                background: colors.primaryGradient,
                color: colors.textLight,
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              Try Again
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
              Go to Home
            </Button>
          </Stack>
          
          <Typography
            variant="caption"
            color={colors.textSecondary}
            sx={{ mt: 4, display: "block" }}
          >
            If this issue persists, please contact support.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentFailure;