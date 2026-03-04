// PaymentSuccess.jsx
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colors } from "../Constants";

const PaymentSuccess = ({ orderId }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "rgba(245, 255, 250, 0.95)", // soft white-green background
        color: "#1F2937",
        py: { xs: 4, md: 8 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 4, md: 6 },
            px: { xs: 2, md: 0 },
            background: "rgba(255, 255, 255, 0.85)",
            borderRadius: 3,
            boxShadow: "0 10px 25px rgba(34,197,94,0.15)",
            backdropFilter: "blur(6px)",
          }}
        >
          <CheckCircleIcon
            sx={{ fontSize: 80, color: "#22C55E", mb: 3 }}
          />
          
          <Typography
            variant="h4"
            fontWeight={700}
            color="#16A34A" // brighter green
            gutterBottom
          >
            Payment Successful! 🎉
          </Typography>
          
          <Typography
            variant="body1"
            color="#374151" // dark gray
            sx={{ mb: 3, maxWidth: 500, mx: "auto", lineHeight: 1.6 }}
          >
            Your order has been confirmed and is being processed.
          </Typography>
          
          {orderId && (
            <Typography
              variant="caption"
              sx={{
                display: "inline-block",
                bgcolor: "#DCFCE7", // light green background
                color: "#065F46", // deep green text
                px: 2,
                py: 1,
                borderRadius: 1,
                fontWeight: 600,
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
            {/* View Order Button (optional, uncomment if needed) */}
            {/* <Button
              variant="contained"
              onClick={() => (window.location.href = "/orders")}
              sx={{
                background: "linear-gradient(90deg, #22C55E, #16A34A)",
                color: "#F9FAFB",
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              View Order
            </Button> */}
            
            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/")}
              sx={{
                borderColor: "#22C55E",
                color: "#065F46",
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                '&:hover': {
                  borderColor: "#16A34A",
                  bgcolor: "rgba(220,252,231,0.6)",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Stack>
          
          <Typography
            variant="caption"
            color="#4B5563" // medium gray
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