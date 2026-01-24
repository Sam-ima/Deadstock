// components/checkout/CheckoutForm.jsx
import React from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SecurityIcon from "@mui/icons-material/Security";
import { colors } from "./Constants";
import ProgressBar from "./ProgressBar";
import ContactStep from "./ContactStep";
import ShippingStep from "./ShippingSteps";
import PaymentStep from "./PaymentStep";

const steps = ["Contact", "Shipping", "Payment"];

const CheckoutForm = ({
  activeStep,
  paymentMethod,
  loading,
  user,
  onNext,
  onBack,
  onPayment,
  onPaymentMethodChange,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        bgcolor: colors.paper,
        borderRadius: 4,
        border: `2px solid ${colors.border}`,
        boxShadow: `0 8px 32px ${colors.shadow}`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0 12px 48px ${colors.shadow}`,
        },
      }}
    >
      {/* Progress Bar */}
      <ProgressBar activeStep={activeStep} steps={steps} />

      {/* Step Content */}
      {activeStep === 0 && <ContactStep user={user} />}
      {activeStep === 1 && <ShippingStep user={user} />}
      {activeStep === 2 && (
        <PaymentStep
          paymentMethod={paymentMethod}
          onPaymentMethodChange={onPaymentMethodChange}
        />
      )}

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0 || loading}
          onClick={onBack}
          sx={{
            borderColor: colors.primary,
            color: colors.primary,
            px: 4,
            borderRadius: 2,
            fontWeight: 600,
            "&:hover": {
              borderColor: colors.primaryDark,
              bgcolor: colors.paperLight,
            },
          }}
        >
          ← Back
        </Button>

        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? onPayment : onNext}
          disabled={loading || !user}
          endIcon={
            activeStep === steps.length - 1 ? null : <ArrowForwardIcon />
          }
          sx={{
            background:
              activeStep === steps.length - 1
                ? colors.accentGradient
                : colors.primaryGradient,
            color: colors.textLight,
            px: 5,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: "1rem",
            py: 1.5,
            boxShadow: `0 4px 20px ${colors.shadow}`,
            minWidth: 180,
            "&:hover": {
              boxShadow: `0 6px 30px ${colors.shadow}`,
              transform: loading ? "none" : "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: colors.textLight }} />
          ) : activeStep === steps.length - 1 ? (
            "Pay Now"
          ) : (
            "Continue"
          )}
        </Button>
      </Box>

      {/* Security badge */}
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
          gap: 1,
        }}
      >
        <SecurityIcon sx={{ color: colors.success, fontSize: 20 }} />
        <Typography variant="caption" color={colors.textSecondary}>
          SSL Secured • 256-bit Encryption • PCI Compliant
        </Typography>
      </Box> */}
    </Paper>
  );
};

export default CheckoutForm;
