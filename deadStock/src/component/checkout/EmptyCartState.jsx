import { Box, Container, Typography, Button } from "@mui/material";
import { colors } from "./Constants";

const EmptyCartState = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg,
        color: colors.textPrimary,
        py: { xs: 4, md: 8 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          color={colors.textPrimary}
          gutterBottom
        >
          Your cart is empty
        </Typography>
        <Typography variant="body1" color={colors.textSecondary} sx={{ mb: 4 }}>
          Add items to your cart before proceeding to checkout
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
      </Container>
    </Box>
  );
};

export default EmptyCartState;
