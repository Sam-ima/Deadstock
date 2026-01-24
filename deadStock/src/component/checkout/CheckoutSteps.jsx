import { Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { steps, colors } from "./Constants";

export default function CheckoutSteps({
  activeStep,
  onNext,
  onBack,
  children,
  isLast,
  loading,
}) {
  return (
    <>
      {children}

      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          disabled={activeStep === 0 || loading}
          onClick={onBack}
          variant="outlined"
        >
          Back
        </Button>

        <Button
          onClick={onNext}
          disabled={loading}
          endIcon={!isLast && <ArrowForwardIcon />}
          sx={{
            background: isLast ? colors.accentGradient : colors.primaryGradient,
            color: colors.textLight,
          }}
        >
          {isLast ? "Pay Now" : "Continue"}
        </Button>
      </Box>
    </>
  );
}
